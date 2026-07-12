#!/usr/bin/env node
// scripts/agents/content.mjs — Content Manager (GitHub Actions)
// Turns a plain-English instruction into a PR editing src/content/*.ts.

import {
  fail,
  getFile,
  openContentPr,
  parseAgentJson,
  requireEnv,
  runAgent,
} from "./lib.mjs";

const CONTENT_FILES = [
  "src/content/site.ts",
  "src/content/divisions.ts",
  "src/content/ventures.ts",
];

async function main() {
  requireEnv(["ANTHROPIC_API_KEY", "GITHUB_TOKEN", "GITHUB_REPO"]);

  const instruction = (process.env.AGENT_INSTRUCTION ?? "").trim().slice(0, 2000);
  if (!instruction) fail("No instruction. Set AGENT_INSTRUCTION.");

  const current = await Promise.all(
    CONTENT_FILES.map(async (p) => {
      try {
        return { path: p, text: (await getFile(p)).text };
      } catch {
        return null;
      }
    }),
  );

  const contextBlock = current
    .filter((f) => f !== null)
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

  let plan;
  try {
    plan = parseAgentJson(raw, "Content agent");
  } catch (err) {
    fail(err.message);
  }

  if (plan.decision === "refuse") {
    console.log(`refused: ${plan.reason}`);
    process.exit(0);
  }

  const illegal = (plan.files ?? []).filter(
    (f) => !f.path.startsWith("src/content/"),
  );
  if (illegal.length > 0 || !plan.files || plan.files.length === 0) {
    fail(
      `Blocked: agent attempted to edit outside src/content/ (${
        illegal.map((f) => f.path).join(", ") || "no files"
      }).`,
    );
  }

  const prUrl = await openContentPr({
    title: plan.prTitle || "content: update via content agent",
    body: `${plan.prBody}\n\n**Original instruction:** ${instruction}`,
    files: plan.files,
  });

  console.log(`pr-opened: ${prUrl}`);
  console.log(`reason: ${plan.reason}`);
}

main().catch((err) => {
  console.error("[content-agent:error]", err);
  process.exit(1);
});
