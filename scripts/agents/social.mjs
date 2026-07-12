#!/usr/bin/env node
// scripts/agents/social.mjs — Social Repurposer (GitHub Actions)
// Turns a published blog post into social variants as a PR.
// Refuses draft: true posts.

import {
  fail,
  getFile,
  isBrand,
  openContentPr,
  parseAgentJson,
  requireEnv,
  runBrandAgent,
} from "./lib.mjs";

async function main() {
  requireEnv(["ANTHROPIC_API_KEY", "GITHUB_TOKEN", "GITHUB_REPO"]);

  const brand = (process.env.AGENT_BRAND ?? "").toLowerCase().trim();
  const slug = (process.env.AGENT_SLUG ?? "").toLowerCase().trim();

  if (!isBrand(brand)) fail(`Unknown brand "${brand}".`);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    fail("slug must be the post's kebab-case slug, e.g. 2026-07-12-my-post");
  }

  const postPath = `src/content/blog/${brand}/${slug}.mdx`;
  let mdx;
  try {
    mdx = (await getFile(postPath)).text;
  } catch {
    fail(`Post not found at ${postPath}. Pass the filename without .mdx.`);
  }

  if (/^\s*draft:\s*true/m.test(mdx)) {
    fail("Post is still draft: true — publish it first.");
  }

  const raw = await runBrandAgent({
    skill: "social-repurposer",
    brand,
    maxTokens: 3000,
    messages: [
      {
        role: "user",
        content: `Brand: ${brand}\nPost URL path: /blog/${brand}/${slug}\n\nSOURCE POST MDX:\n${mdx.slice(0, 40_000)}`,
      },
    ],
  });

  let plan;
  try {
    plan = parseAgentJson(raw, "Repurposer");
  } catch (err) {
    fail(err.message);
  }

  if (plan.decision === "refuse") {
    console.log(`refused: ${plan.reason}`);
    process.exit(0);
  }

  const outPath = `src/content/social/${brand}/${slug}.json`;
  const prUrl = await openContentPr({
    title: `social(${brand}): ${slug}`.slice(0, 90),
    body: [
      `**Source post:** \`${postPath}\``,
      ``,
      `**LinkedIn preview:**`,
      plan.linkedin.text.slice(0, 400),
      ``,
      plan.ownerNotes ? `⚠️ **Check before posting:** ${plan.ownerNotes}` : "",
      ``,
      `_Copy each variant from the JSON when posting — nothing publishes automatically._`,
    ].join("\n"),
    files: [
      {
        path: outPath,
        content:
          JSON.stringify(
            {
              brand,
              sourcePost: postPath,
              generated: new Date().toISOString(),
              linkedin: plan.linkedin,
              instagram: plan.instagram,
              whatsapp: plan.whatsapp,
              ownerNotes: plan.ownerNotes,
            },
            null,
            2,
          ) + "\n",
      },
    ],
  });

  console.log(`pr-opened: ${prUrl}`);
  if (plan.ownerNotes) console.log(`ownerNotes: ${plan.ownerNotes}`);
}

main().catch((err) => {
  console.error("[social-agent:error]", err);
  process.exit(1);
});
