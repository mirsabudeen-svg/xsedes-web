#!/usr/bin/env node
// scripts/brand-lint.mjs
// Agent 3 (mechanical half): scans src/ for XSEDES brand violations.
// Exit code 1 on BLOCKERs so CI fails. See agents/skills/brand-guardian.md.

import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

const ALLOWED_HEX = new Set(["#000000", "#000", "#4ef2d3", "#edf2f0"]);
const HYPE = /\b(revolutionary|game-?changing|world-?class|cutting-?edge|disruptive|next-?level|unleash)\b/gi;
const IDENTITY = /\b(event management company|we organise events|event organiser)\b/gi;
const BAD_DIVISION = /\b(XConsult|X Consult|X·Consult|XLab|X Lab(?!s)|XBuild|X Build|XOps|X Ops)\b/g;
const SERIF = /font-family\s*:\s*[^;]*(serif|georgia|times|instrument)/gi;
const HEX = /#[0-9a-fA-F]{3,8}\b/g;

// The approved comparison section legitimately names what XSEDES is NOT.
const IDENTITY_ALLOWLIST = ["src/content/site.ts", "src/content/positioning"];

const findings = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (!["node_modules", ".next", ".git"].includes(name)) walk(p);
    } else if (/\.(ts|tsx|js|jsx|css|mdx?)$/.test(name)) {
      check(p);
    }
  }
}

function report(sev, file, line, text, fix) {
  findings.push({ sev, file: relative(ROOT, file), line, text: text.slice(0, 80), fix });
}

function check(file) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  // Generated skill/brand bundle embeds the guardian's own ban-lists — skip it.
  if (rel === "src/lib/agents/generated.ts") return;

  const lines = readFileSync(file, "utf8").split("\n");

  lines.forEach((lineText, i) => {
    const n = i + 1;

    for (const m of lineText.matchAll(HEX)) {
      const hex = m[0].toLowerCase();
      // normalize #fff-style 3/4-digit and 8-digit alpha to base
      const base = hex.length >= 7 ? hex.slice(0, 7) : hex;
      if (!ALLOWED_HEX.has(base)) {
        report("BLOCKER", file, n, m[0], "Use #000000 / #4EF2D3 / #EDF2F0 or rgba white/teal");
      }
    }

    for (const m of lineText.matchAll(HYPE)) {
      report("BLOCKER", file, n, m[0], "Remove hype language — engineering-led voice");
    }

    if (!IDENTITY_ALLOWLIST.some((a) => rel.startsWith(a))) {
      for (const m of lineText.matchAll(IDENTITY)) {
        report("BLOCKER", file, n, m[0], "XSEDES is a technology partner, never an organiser");
      }
    }

    for (const m of lineText.matchAll(BAD_DIVISION)) {
      report("WARN", file, n, m[0], "Canonical division names are hyphenated: X-Consult, X-Lab, X-Build, X-Ops");
    }

    for (const m of lineText.matchAll(SERIF)) {
      report("BLOCKER", file, n, m[0], "Barlow only — no serif faces");
    }
  });

  // Copy-in-components heuristic: long prose strings inside components/
  if (rel.startsWith("src/components/")) {
    lines.forEach((lineText, i) => {
      const prose = lineText.match(/["'`]([A-Z][^"'`]{60,})["'`]/);
      if (prose && !/className|import|from|href|aria-/.test(lineText)) {
        report("WARN", file, i + 1, prose[1], "Move copy into src/content/*.ts");
      }
    });
  }
}

try {
  walk(SRC);
} catch (e) {
  console.error("brand-lint: could not scan src/ —", e.message);
  process.exit(0); // don't fail CI on scaffold-stage repos
}

const blockers = findings.filter((f) => f.sev === "BLOCKER");
const warns = findings.filter((f) => f.sev === "WARN");

for (const f of findings) {
  console.log(`${f.sev}  ${f.file}:${f.line}  "${f.text}"  → ${f.fix}`);
}
console.log(
  `\nbrand-lint: ${blockers.length} blocker(s), ${warns.length} warning(s) — ` +
    (blockers.length ? "FAIL" : warns.length ? "PASS WITH WARNINGS" : "PASS"),
);
process.exit(blockers.length ? 1 : 0);
