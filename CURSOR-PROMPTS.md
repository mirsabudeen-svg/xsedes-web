# Cursor Prompts — XSEDES Agent System Integration

Paste these into Cursor (agent mode) in order. Prompts A–C get you fully
operational; D–F are optional upgrades.

---

## Prompt A — Integrate everything (run first)

```
I've added an agent system to this repo: agents/skills/*.md,
src/lib/agents/*, src/app/api/concierge/route.ts,
src/app/api/content-agent/route.ts,
src/components/agent/ConciergeWidget.tsx, scripts/brand-lint.mjs, and
.github/workflows/qa-audit.yml.

Integrate them into this Next.js app:
1. Mount <ConciergeWidget /> in src/app/layout.tsx so it appears on
   every page, rendered after the main content. It must not interfere
   with the boot gate — hide it (return null) while the gate is mounted,
   using the gate-dismissed context flag.
2. Ensure the "@/lib/agents/*" path alias resolves (tsconfig paths).
3. Add "brand-lint": "node scripts/brand-lint.mjs" to package.json
   scripts and chain it into "lint".
4. Verify agents/skills/*.md are readable at runtime on Vercel: add
   "agents/skills/**" to outputFileTracingIncludes for the two API
   routes in next.config (so the markdown ships with the serverless
   functions).
5. Run npm run build and npm run brand-lint; fix anything that fails.
Do not change any file under agents/skills/ — those are the agent
brains and are edited by hand only.
```

## Prompt B — Environment + deploy check

```
Create .env.example listing ANTHROPIC_API_KEY, GITHUB_TOKEN,
GITHUB_REPO, ADMIN_SECRET with one-line comments explaining each (no
real values). Add a startup guard in both API routes that returns a
clear 503 JSON error naming which env var is missing, so
misconfiguration is diagnosable from the browser. Confirm .env* is in
.gitignore.
```

## Prompt C — Smoke tests

```
Add a minimal test setup (vitest) with three tests:
1. brand-lint flags a file containing "#FF0000" and "revolutionary" as
   blockers (write to a temp dir and run the script against it).
2. The concierge route rejects empty message arrays with 400.
3. The content-agent route rejects requests without the Bearer secret
   with 401, and blocks a mocked agent plan that writes to
   "src/app/page.tsx" (outside src/content/).
Add "test" to package.json and run it.
```

---

## Prompt D (optional) — Admin console page

```
Build src/app/admin/page.tsx: a password-gated (ADMIN_SECRET entered
once, kept in memory only) console styled to the XSEDES system — black,
hairlines, Barlow, teal accent, "§ ADMIN · CONTENT CONSOLE" header.

One textarea: "Describe the content change…", a submit button that
POSTs to /api/content-agent with the Bearer secret, and a result panel
showing status/reason and the PR link when opened. Below, a static
crib sheet of example instructions:
- "Update the VELOS one-liner to mention synchronized reveal choreography"
- "Change the contact email to partnerships@xsedes.com"
- "Rewrite the X-Ops function list to include 24/7 remote monitoring"
Add a robots noindex meta on this page.
```

## Prompt E (optional) — Lead capture upgrade

```
Extend the concierge lead handling: when the visitor shares contact
details, POST a structured lead {name?, org?, need?, contact, transcript
last 6 turns} to a new /api/leads route that emails it via Resend
(RESEND_API_KEY env; add it to .env.example) to a LEADS_TO address.
Never block or delay the chat reply on the email — fire and forget with
error logging. Update agents/skills/site-concierge.md is NOT needed;
detection happens in code by asking the model for a one-token
lead/no-lead classification after each exchange (separate cheap call,
max_tokens 4).
```

## Prompt F (optional) — Claude review step in CI

```
Extend .github/workflows/qa-audit.yml with a second job "llm-review"
that runs only when the ANTHROPIC_API_KEY secret exists: it takes the
PR diff (git diff origin/main...HEAD, capped at 60KB), sends it to the
Anthropic Messages API with the contents of
agents/skills/brand-guardian.md as the system prompt, asks for the
report format defined in that skill, and posts the response as a PR
comment titled "🧠 Brand Guardian review". Non-blocking: this job never
fails the build; the mechanical linter remains the gate.
```

---

## Ongoing usage prompts (keep handy)

- **Fix audit findings:** "Here is the QA Auditor's PR comment: <paste>.
  Fix every BLOCKER and as many WARNs as reasonable without changing
  approved copy."
- **Teach the concierge a new fact:** "Append to
  agents/skills/site-concierge.md answer building blocks: <fact>. Keep
  the file's tone and rules untouched." (Then redeploy.)
- **New content file:** "Create src/content/<name>.ts with typed exports
  for <thing>, add it to CONTENT_FILES in
  src/app/api/content-agent/route.ts so the Content Manager can edit it."

---

## Prompt G — Integrate the Blog + SEO agents and multi-brand registry

```
New files added: src/lib/agents/brands.ts, agents/brands/*.md,
agents/skills/blog-writer.md, agents/skills/seo-optimizer.md,
src/app/api/blog-agent/route.ts, src/app/api/seo-agent/route.ts.

Integrate them:
1. Add "agents/brands/**" to outputFileTracingIncludes for the blog and
   seo routes (skills are already included).
2. Create the blog rendering layer: src/app/blog/[brand]/[slug]/page.tsx
   and an index at src/app/blog/page.tsx grouped by brand, reading MDX
   from src/content/blog/{brand}/ via next-mdx-remote or @next/mdx.
   Posts with draft: true render only in development. Style to the
   XSEDES system (black, hairlines, Barlow, "§ BLOG · <BRAND>" labels).
3. Add SITE_URL to .env.example.
4. Extend the admin console (Prompt D) with two new tabs: "Blog" (brand
   dropdown from the BRANDS array + topic + notes → POST /api/blog-agent,
   show PR link + ownerNotes) and "SEO" (brand dropdown + path → POST
   /api/seo-agent, render the findings table sorted by priority with
   executor badges).
5. Build and brand-lint; fix failures.
```

## Prompt H — Cross-brand internal linking pass

```
Using the crossBrandLinks arrays from saved SEO agent reports (I'll
paste them), add the suggested internal links to the relevant content
files in src/content/ — anchor text natural, no more than 2 added links
per page. Every venture page must link to the XSEDES operating model
section at least once. Open this as a single focused commit.
```

## Prompt I — Integrate the Social Repurposer agent (files pre-written)

```
New files added: agents/skills/social-repurposer.md and
src/app/api/social-agent/route.ts (Agent 6). Integrate:
1. Confirm the route builds and the "@/lib/agents/*" imports resolve.
2. Add "agents/skills/**" and "agents/brands/**" to
   outputFileTracingIncludes for this route like the others.
3. Add a "Social" tab to the admin console: brand dropdown + slug input
   (the blog filename without .mdx) → POST /api/social-agent with the
   Bearer secret; on success show the PR link, ownerNotes, and a
   copy-button per platform variant read from the PR's JSON preview.
4. Update AGENTS-ROADMAP.md: move Social Repurposer from "recommended"
   into the "Agents now in the system" table as #6.
Build and brand-lint; fix failures.
```
