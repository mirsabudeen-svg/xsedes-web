// src/app/api/content-agent/route.ts
// Agent 2: Content Manager — turns a plain-English instruction into a
// pull request editing src/content/*.ts. Admin-only via ADMIN_SECRET.
// POST { instruction: string } → { status, prUrl?, reason }

import { NextResponse } from "next/server";
import { runAgent } from "@/lib/agents/anthropic";
import { envUnavailable, missingEnv } from "@/lib/agents/env";
import { getFile, openContentPr } from "@/lib/agents/github";

export const runtime = "nodejs";
export const maxDuration = 60;

const CONTENT_FILES = [
  "src/content/site.ts",
  "src/content/divisions.ts",
  "src/content/ventures.ts",
];

type AgentPlan = {
  decision: "proceed" | "refuse";
  reason: string;
  prTitle: string;
  prBody: string;
  files: Array<{ path: string; content: string }>;
};

function authorized(req: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization") ?? "";
  return header === `Bearer ${secret}`;
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
    const body = (await req.json()) as { instruction?: string };
    const instruction = (body.instruction ?? "").trim().slice(0, 2000);
    if (!instruction) {
      return NextResponse.json({ error: "No instruction." }, { status: 400 });
    }

    // Give the agent the CURRENT content files so edits are grounded.
    const current = await Promise.all(
      CONTENT_FILES.map(async (p) => {
        try {
          return { path: p, text: (await getFile(p)).text };
        } catch {
          return null; // file may not exist yet in early phases
        }
      }),
    );

    const contextBlock = current
      .filter((f): f is { path: string; text: string } => f !== null)
      .map((f) => `=== ${f.path} ===\n${f.text}`)
      .join("\n\n");

    const raw = await runAgent({
      skill: "content-manager",
      maxTokens: 8000,
      messages: [
        {
          role: "user",
          content: `CURRENT CONTENT FILES:\n\n${contextBlock}\n\nOWNER INSTRUCTION:\n${instruction}`,
        },
      ],
    });

    let plan: AgentPlan;
    try {
      plan = JSON.parse(raw.replace(/^```(json)?|```$/g, "").trim()) as AgentPlan;
    } catch {
      return NextResponse.json(
        { status: "error", reason: "Agent returned unparseable output — try rephrasing." },
        { status: 502 },
      );
    }

    if (plan.decision === "refuse") {
      return NextResponse.json({ status: "refused", reason: plan.reason });
    }

    // Hard guardrail regardless of what the model returned: only
    // src/content/ paths may be written. Defense in depth.
    const illegal = plan.files.filter((f) => !f.path.startsWith("src/content/"));
    if (illegal.length > 0 || plan.files.length === 0) {
      return NextResponse.json(
        {
          status: "refused",
          reason: `Blocked: agent attempted to edit outside src/content/ (${illegal
            .map((f) => f.path)
            .join(", ") || "no files"}).`,
        },
        { status: 400 },
      );
    }

    const prUrl = await openContentPr({
      title: plan.prTitle || "content: update via content agent",
      body: `${plan.prBody}\n\n**Original instruction:** ${instruction}`,
      files: plan.files,
    });

    return NextResponse.json({ status: "pr-opened", prUrl, reason: plan.reason });
  } catch (err) {
    console.error("[content-agent:error]", err);
    return NextResponse.json(
      { status: "error", reason: "Content agent failed — check Vercel logs." },
      { status: 500 },
    );
  }
}
