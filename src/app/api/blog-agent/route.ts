// src/app/api/blog-agent/route.ts
// Agent 4: Blog Writer — drafts a brand-voiced MDX post and opens a PR.
// Admin-only. POST { brand, topic, notes? } → { status, prUrl?, ownerNotes? }

import { NextResponse } from "next/server";
import { runBrandAgent, isBrand } from "@/lib/agents/brands";
import { envUnavailable, missingEnv } from "@/lib/agents/env";
import { openContentPr } from "@/lib/agents/github";

export const runtime = "nodejs";
export const maxDuration = 60;

type BlogPlan = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  brand: string;
  needsOwnerInput: boolean;
  ownerNotes: string;
  mdx: string;
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
    const body = (await req.json()) as {
      brand?: string;
      topic?: string;
      notes?: string;
    };
    const brand = (body.brand ?? "xsedes").toLowerCase().trim();
    const topic = (body.topic ?? "").trim().slice(0, 500);
    const notes = (body.notes ?? "").trim().slice(0, 2000);

    if (!isBrand(brand)) {
      return NextResponse.json(
        { error: `Unknown brand "${brand}". Add agents/brands/${brand}.md first.` },
        { status: 400 },
      );
    }
    if (!topic) {
      return NextResponse.json({ error: "No topic." }, { status: 400 });
    }

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

    let plan: BlogPlan;
    try {
      plan = JSON.parse(raw.replace(/^```(json)?|```$/g, "").trim()) as BlogPlan;
    } catch {
      return NextResponse.json(
        { status: "error", reason: "Writer returned unparseable output — try again." },
        { status: 502 },
      );
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
        `**Tags:** ${plan.tags.join(", ")}`,
        plan.needsOwnerInput
          ? `\n⚠️ **Owner input needed before merge:**\n${plan.ownerNotes}`
          : "",
        `\nPost is created with \`draft: true\` — flip to \`false\` in this PR to publish on merge.`,
      ].join("\n"),
      files: [{ path, content: plan.mdx }],
    });

    return NextResponse.json({
      status: "pr-opened",
      prUrl,
      ownerNotes: plan.needsOwnerInput ? plan.ownerNotes : undefined,
    });
  } catch (err) {
    console.error("[blog-agent:error]", err);
    return NextResponse.json(
      { status: "error", reason: "Blog agent failed — check Vercel logs." },
      { status: 500 },
    );
  }
}
