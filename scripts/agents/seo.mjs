#!/usr/bin/env node
// scripts/agents/seo.mjs — SEO Optimizer (GitHub Actions)
// Audits a live page and writes findings to GITHUB_STEP_SUMMARY.
// Report-only: never opens a PR.

import { appendFileSync } from "fs";
import {
  fail,
  isBrand,
  parseAgentJson,
  requireEnv,
  runBrandAgent,
} from "./lib.mjs";

const PRIORITY_ORDER = { HIGH: 0, MEDIUM: 1, LOW: 2 };

function distill(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "<svg…/>")
    .replace(/\s+/g, " ")
    .slice(0, 60_000);
}

function executorBadge(executor) {
  if (executor === "content-manager") return "`content-manager`";
  if (executor === "developer") return "`developer`";
  return `\`${executor ?? "unknown"}\``;
}

function toSummaryMarkdown(brand, pagePath, report) {
  const findings = Array.isArray(report.findings) ? [...report.findings] : [];
  findings.sort(
    (a, b) =>
      (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9),
  );

  const lines = [
    `## SEO audit — ${brand} · \`${pagePath}\``,
    ``,
    `**Score:** ${report.score ?? "—"} / 100`,
    `**Primary phrase:** ${report.primaryPhrase ?? "—"}`,
    ``,
    report.summary ?? "",
    ``,
    `### Findings`,
    ``,
    `| Priority | Area | Issue | Fix | Executor |`,
    `| --- | --- | --- | --- | --- |`,
  ];

  for (const f of findings) {
    const issue = String(f.issue ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
    const fix = String(f.fix ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
    lines.push(
      `| **${f.priority ?? "—"}** | ${f.area ?? "—"} | ${issue} | ${fix} | ${executorBadge(f.executor)} |`,
    );
  }

  if (Array.isArray(report.crossBrandLinks) && report.crossBrandLinks.length) {
    lines.push(``, `### Cross-brand link suggestions`, ``);
    for (const link of report.crossBrandLinks) {
      lines.push(`- ${link}`);
    }
  }

  lines.push(``);
  return lines.join("\n");
}

async function main() {
  requireEnv(["ANTHROPIC_API_KEY", "SITE_URL"]);

  const brand = (process.env.AGENT_BRAND ?? "xsedes").toLowerCase().trim();
  const pagePath = (process.env.AGENT_PATH ?? "/").trim();

  if (!isBrand(brand)) fail(`Unknown brand "${brand}".`);
  if (!pagePath.startsWith("/") || pagePath.includes("..")) {
    fail("path must be a site-relative path like /ventures/velos");
  }

  const base = process.env.SITE_URL.replace(/\/$/, "");
  const pageRes = await fetch(`${base}${pagePath}`, {
    headers: { "user-agent": "xsedes-seo-agent" },
  });
  if (!pageRes.ok) {
    fail(`Could not fetch ${pagePath} (${pageRes.status}).`);
  }
  const html = distill(await pageRes.text());

  const raw = await runBrandAgent({
    skill: "seo-optimizer",
    brand,
    maxTokens: 4000,
    messages: [
      {
        role: "user",
        content: `Audit this page.\nURL path: ${pagePath}\nBrand context: ${brand}\n\nPAGE HTML (scripts/styles stripped):\n${html}`,
      },
    ],
  });

  let report;
  try {
    report = parseAgentJson(raw, "Optimizer");
  } catch (err) {
    fail(err.message);
  }

  const md = toSummaryMarkdown(brand, pagePath, report);
  console.log(md);

  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (summaryPath) {
    appendFileSync(summaryPath, md, "utf8");
  }
}

main().catch((err) => {
  console.error("[seo-agent:error]", err);
  process.exit(1);
});
