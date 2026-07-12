// src/app/api/social-agent/route.ts
// Agent 6: Social Repurposer — turns a published blog post into
// LinkedIn / Instagram / WhatsApp variants in the post's brand voice,
// delivered as a PR. Admin-only.
// POST { brand, slug } → { status, prUrl?, ownerNotes?, reason? }

import { NextResponse } from "next/server";
import { runBrandAgent, isBrand } from "@/lib/agents/brands";
import { envUnavailable, missingEnv } from "@/lib/agents/env";
import { getFile, openContentPr } from "@/lib/agents/github";

export const runtime = "nodejs";
export const maxDuration = 60;

type SocialPlan = {
  decision: "proceed" | "refuse";
  reason: string;
  postSlug: string;
  brand: string;
  linkedin: { text: string; hashtags: string[] };
  instagram: { caption: string; hashtags: string[]; imageDirection: string };
  whatsapp: { text: string };
  ownerNotes: string;
};

function authorized(req: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  return !!secret && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(req: Request) {
  const missing = missingEnv([
    "ANTHROPIC_API_KEY",
    "GITHUB_TOKEN",
    "GITHUB_REPO",
    "ADMIN_SECRET",
  ]);
  if (missing.length) return envUnavailable(missing);

  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { brand?: string; slug?: string };
    const brand = (body.brand ?? "").toLowerCase().trim();
    const slug = (body.slug ?? "").toLowerCase().trim();

    if (!isBrand(brand)) {
      return NextResponse.json({ error: `Unknown brand "${brand}".` }, { status: 400 });
    }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      return NextResponse.json(
        { error: "slug must be the post's kebab-case slug, e.g. 2026-07-12-my-post" },
        { status: 400 },
      );
    }

    // Locate the post: exact filename, since blog-agent names files
    // {date}-{slug}.mdx and callers pass the full stored slug.
    const postPath = `src/content/blog/${brand}/${slug}.mdx`;
    let mdx: string;
    try {
      mdx = (await getFile(postPath)).text;
    } catch {
      return NextResponse.json(
        { error: `Post not found at ${postPath}. Pass the filename without .mdx.` },
        { status: 404 },
      );
    }

    // Guard in code as well as in the skill: never repurpose drafts.
    if (/^\s*draft:\s*true/m.test(mdx)) {
      return NextResponse.json(
        { status: "refused", reason: "Post is still draft: true — publish it first." },
        { status: 400 },
      );
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

    let plan: SocialPlan;
    try {
      plan = JSON.parse(raw.replace(/^```(json)?|```$/g, "").trim()) as SocialPlan;
    } catch {
      return NextResponse.json(
        { status: "error", reason: "Repurposer returned unparseable output — try again." },
        { status: 502 },
      );
    }

    if (plan.decision === "refuse") {
      return NextResponse.json({ status: "refused", reason: plan.reason });
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
          content: JSON.stringify(
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

    return NextResponse.json({
      status: "pr-opened",
      prUrl,
      ownerNotes: plan.ownerNotes || undefined,
    });
  } catch (err) {
    console.error("[social-agent:error]", err);
    return NextResponse.json(
      { status: "error", reason: "Social agent failed — check Vercel logs." },
      { status: 500 },
    );
  }
}
