# XSEDES Smart Website Management System — Setup Guide

You are hosting the **site + Concierge on Cloudflare Workers**, **four admin agents as GitHub Actions**, plus **dev-time MCP tooling**. Total manual work: ~20 minutes, mostly pasting keys.

## The system at a glance

| Agent | Where it lives | What it does | Needs from you |
|---|---|---|---|
| **1. Site Concierge** (frontend + backend) | Chat widget + `/api/concierge` on Cloudflare Workers | Answers visitor questions about XSEDES, divisions, ventures; captures partner leads. Strictly on-brand, never invents facts. | `ANTHROPIC_API_KEY` Worker secret |
| **2. Content Manager** | GitHub Action `Agent — Content Manager` | You type an instruction → agent edits `src/content/*` and **opens a PR** (never pushes to main). | `ANTHROPIC_API_KEY` repo secret |
| **3. Blog Writer** | GitHub Action `Agent — Blog Writer` | Topic + brand → draft MDX (`draft: true`) as a PR. | same |
| **4. SEO Optimizer** | GitHub Action `Agent — SEO Optimizer` | Audits a live path; writes findings to the workflow summary (no PR). | same + `SITE_URL` repo variable |
| **5. Social Repurposer** | GitHub Action `Agent — Social Repurposer` | Published post → LinkedIn / Instagram / WhatsApp variants as a PR. Refuses drafts. | same |
| **QA / Brand Auditor** | GitHub Actions on every PR | Builds the site, brand-lints, posts results. | Nothing — enable Actions |
| **Dev agents** (Cursor MCPs) | Your Cursor editor | GitHub, Playwright, 21st.dev Magic, etc. | Tokens in `.cursor/mcp.json` |

**Safety model:** admin agents only open pull requests (or report). You review and merge. The Concierge can only talk. Nothing deploys itself from an agent.

---

## Setup — do these once, in order

### Step 1 — Cloudflare (site + Concierge)

1. Install deps: `npm install`
2. Log in: `npx wrangler login`
3. Deploy: `npm run deploy`
4. Set the Concierge secret:
   ```
   npx wrangler secret put ANTHROPIC_API_KEY
   ```
5. Set the public site URL as a Worker variable (Wrangler dashboard → Variables, or in `wrangler.jsonc` under `vars`):
   ```
   SITE_URL = https://your-worker.workers.dev
   ```
   (no trailing slash). Used by the SEO Action when fetching pages.

Local check before deploy: `npm run preview` (builds with OpenNext and runs under `workerd`).

### Step 2 — GitHub (admin agents)

1. Repo → **Settings → Secrets and variables → Actions** → New repository secret:
   - `ANTHROPIC_API_KEY` — same Anthropic key (or a separate one with a spend limit)
2. Repo → **Settings → Variables → Actions** → New variable:
   - `SITE_URL` — your deployed Cloudflare URL (same as above)
3. Repo → **Settings → Actions → General** → **Workflow permissions**:
   - Allow GitHub Actions to create and approve pull requests — **must be ticked**
   - Read and write permissions (so agents can open PRs)

No fine-grained PAT is required for the admin agents: workflows use the built-in `secrets.GITHUB_TOKEN` with `contents: write` and `pull-requests: write`.

### Step 3 — Enable the auditor

Push to GitHub. Actions tab → enable workflows. Every PR gets an automatic brand + build audit.

### Step 4 — Wire Cursor's MCP tools

Open `.cursor/mcp.json`, paste your GitHub token and (optional) 21st.dev Magic key where marked. Restart Cursor.

### Step 5 — Smoke test

- Visit the deployed Workers URL → Concierge bubble → ask "What does X-Build do?"
- Actions → **Agent — Content Manager** → Run workflow → instruction e.g. `Change the DEED one-liner to mention patent analytics` → check for a new PR
- Open any PR → see the auditor comment

---

## Daily workflow (admin agents)

1. GitHub → **Actions** tab  
2. Select the agent workflow (Content / Blog / SEO / Social)  
3. **Run workflow** → fill the form → Run  
4. Review the PR (or the SEO job summary) → merge when ready → redeploy the site (`npm run deploy` or your CI)

You never need to paste an admin password — auth is your GitHub login.

---

## What each folder contains

- `agents/skills/` + `agents/brands/` — agent brains (source of truth). Edit these by hand; never edit `src/lib/agents/generated.ts` (built by `scripts/generate-skills.mjs` on predev/prebuild).
- `src/app/api/concierge/` — Concierge Workers route.
- `src/components/agent/` — on-brand chat widget.
- `scripts/agents/` — Content / Blog / SEO / Social runners for Actions.
- `scripts/brand-lint.mjs` + `.github/workflows/qa-audit.yml` — auditor.
- `wrangler.jsonc` + `open-next.config.ts` — Cloudflare / OpenNext.
- `.cursor/` — MCP connectors + brand rule.

## Honest limits

- Concierge answers only from skill + brand context. Update `agents/skills/site-concierge.md` (then redeploy) when facts change.
- Content Manager edits under `src/content/` only — by design.
- Costs: Concierge ≈ $0.01–0.03 per conversation with Sonnet. Actions agents cost only when you run them. Set Anthropic spend limits.
