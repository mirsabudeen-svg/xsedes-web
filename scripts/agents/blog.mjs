#!/usr/bin/env node
// scripts/agents/blog.mjs — Blog Writer (GitHub Actions)
// Drafts a brand-voiced MDX post (draft: true) and opens a PR.

import {
  fail,
  isBrand,
  openContentPr,
  parseAgentJson,
  requireEnv,
  runBrandAgent,
} from "./lib.mjs";

async function main() {
  requireEnv(["ANTHROPIC_API_KEY", "GITHUB_TOKEN", "GITHUB_REPO"]);

  const brand = (process.env.AGENT_BRAND ?? "xsedes").toLowerCase().trim();
  const topic = (process.env.AGENT_TOPIC ?? "").trim().slice(0, 500);
  const notes = (process.env.AGENT_NOTES ?? "").trim().slice(0, 2000);

  if (!isBrand(brand)) {
    fail(`Unknown brand "${brand}". Add agents/brands/${brand}.md first.`);
  }
  if (!topic) fail("No topic. Set AGENT_TOPIC.");

  const today = new Date().toISOString().slice(0, 10);
  const raw = await runBrandAgent({
    skill: "blog-writer",
    brand,
    maxTokens: 8000,
    messages: [
      {
        role: "user",
        content: `Today's date: ${today}\nTopic: ${topic}${notes ? `\nOwner notes: ${notes}` : ""}`,
      },
    ],
  });

  let plan;
  try {
    plan = parseAgentJson(raw, "Writer");
  } catch (err) {
    fail(err.message);
  }

  const slug = (plan.slug || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  const path = `src/content/blog/${brand}/${today}-${slug}.mdx`;

  const prUrl = await openContentPr({
    title: `blog(${brand}): ${plan.title}`.slice(0, 90),
    body: [
      `**Brand:** ${brand}`,
      `**Description:** ${plan.description}`,
      `**Tags:** ${(plan.tags ?? []).join(", ")}`,
      plan.needsOwnerInput
        ? `\n⚠️ **Owner input needed before merge:**\n${plan.ownerNotes}`
        : "",
      `\nPost is created with \`draft: true\` — flip to \`false\` in this PR to publish on merge.`,
    ].join("\n"),
    files: [{ path, content: plan.mdx }],
  });

  console.log(`pr-opened: ${prUrl}`);
  if (plan.needsOwnerInput) console.log(`ownerNotes: ${plan.ownerNotes}`);
}

main().catch((err) => {
  console.error("[blog-agent:error]", err);
  process.exit(1);
});
