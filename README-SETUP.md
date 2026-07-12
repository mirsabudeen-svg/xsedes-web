# XSEDES Smart Website Management System — Setup Guide

You are hosting **three agents** plus **dev-time MCP tooling**. Total manual work: ~20 minutes, mostly pasting keys. Everything else is copy the folder → tell Cursor to integrate → push.

## The system at a glance

| Agent | Where it lives | What it does | Needs from you |
|---|---|---|---|
| **1. Site Concierge** (frontend + backend) | Chat widget on the website + `/api/concierge` route on Vercel | Answers visitor questions about XSEDES, divisions, ventures; captures partner leads. Strictly on-brand, never invents facts. | `ANTHROPIC_API_KEY` in Vercel |
| **2. Content Manager** (backend) | `/api/content-agent` route (admin-only) | You type "update the VELOS one-liner to …" → agent edits the content files and **opens a GitHub PR** (never pushes directly). You just click Merge. | `GITHUB_TOKEN` + `ADMIN_SECRET` in Vercel |
| **3. QA / Brand Auditor** (CI) | GitHub Actions, runs on every PR | Builds the site, lints for brand violations (off-brand colors, hype words, banned phrases, serif fonts), posts results on the PR. No API key needed — pure script. | Nothing — enable Actions |
| **Dev agents** (Cursor MCPs) | Your Cursor editor | GitHub, Vercel, Playwright (visual testing), 21st.dev Magic (component gen) available as tools inside Cursor | Paste 2 tokens in `.cursor/mcp.json` |

**Safety model (why you can trust it):** the only agent that changes anything (Content Manager) works through pull requests — you review and merge. The Concierge can only talk. The Auditor can only report. Nothing deploys itself.

---

## Setup — do these once, in order

### Step 1 — Copy the folder
Copy everything in this folder into your `xsedes-web` repo root (same level as `package.json`), keeping the structure. Then open Cursor and paste **Prompt A** from `CURSOR-PROMPTS.md` — Cursor wires the pieces into your Next.js app.

### Step 2 — Get your two keys
1. **Anthropic API key:** console.anthropic.com → API Keys → Create. (Concierge + Content Manager. Expect roughly $5–20/month at modest traffic; set a spend limit in the console.)
2. **GitHub fine-grained token:** github.com → Settings → Developer settings → Fine-grained tokens → only your `xsedes-web` repo → Repository permissions: **Contents: Read & write, Pull requests: Read & write**. Nothing else.

### Step 3 — Add environment variables in Vercel
Vercel → your project → Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-...
GITHUB_TOKEN      = github_pat_...
GITHUB_REPO       = your-username/xsedes-web
ADMIN_SECRET      = (make up a long random string — this is your admin password)
```

### Step 4 — Enable the auditor
Push to GitHub. Go to the repo → Actions tab → enable workflows. Done — every PR now gets an automatic brand + build audit.

### Step 5 — Wire Cursor's MCP tools
Open `.cursor/mcp.json`, paste your GitHub token and (optional) 21st.dev Magic key where marked. Restart Cursor. You now have repo, deployment, browser-testing, and component-generation tools inside the editor.

### Step 6 — Test
- Visit your deployed site → chat bubble bottom-right → ask "What does X-Build do?"
- `curl -X POST https://yoursite.com/api/content-agent -H "Authorization: Bearer YOUR_ADMIN_SECRET" -H "Content-Type: application/json" -d '{"instruction":"Change the DEED one-liner to mention patent analytics"}'` → check GitHub for a new PR.
- Open any PR → see the auditor comment.

---

## Daily workflow after setup (this is the "minimal manual" part)

- **Change website content:** message the Content Manager (or use the admin page from Prompt D) → review the PR it opens → click Merge → Vercel auto-deploys. You never open a code file.
- **Build new sections/components:** use the section prompts + Magic MCP in Cursor.
- **Quality:** automatic on every PR. If the auditor flags something, paste its comment into Cursor and say "fix these".
- **Visitor questions:** handled 24/7 by the Concierge; leads it captures are logged (see `route.ts` — extend to email/WhatsApp later).

## What each folder contains
- `agents/skills/` — the "brains": one markdown skill per agent. Shared by runtime and Cursor so brand truth lives in ONE place. Edit these to change agent behavior — no code needed.
- `src/app/api/` — the two backend agents (Vercel serverless routes).
- `src/components/agent/` — the on-brand chat widget.
- `scripts/brand-lint.mjs` + `.github/workflows/qa-audit.yml` — the auditor.
- `.cursor/` — MCP connectors + the brand rule Cursor obeys in every generation.
- `CURSOR-PROMPTS.md` — paste-ready prompts to integrate and extend all of this.

## Honest limits
- The Concierge answers only from the brand context we give it (`brand-context.ts`). Update that file (or let the Content Manager do it) when facts change.
- Content Manager edits `src/content/*.ts` files only — by design. Widening its file access widens your risk.
- Costs: Concierge ≈ $0.01–0.03 per conversation with Sonnet. The auditor is free. Set Anthropic spend limits.
