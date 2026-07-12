# XSEDES Agent Roadmap — Multi-Brand Architecture & What to Add Next

## How multi-brand works (the one concept to understand)

Every agent = **base skill** (`agents/skills/*.md`, the job) + **brand
overlay** (`agents/brands/*.md`, the voice and facts). At runtime,
`runBrandAgent({ skill, brand })` composes the two. So:

- Blog Writer + `photoshap.md` → a PhotoShap-voiced post about booth tech
- Blog Writer + `velos.md` → a motion-engineering post
- SEO Optimizer + `konstrukt.md` → an audit in KONSTRUKT's parent/educator context

**Adding a future venture = writing ONE markdown file** in
`agents/brands/` and adding its id to the `BRANDS` array in
`src/lib/agents/brands.ts`. Every existing and future agent instantly
speaks the new brand. Overlays may tighten master rules (KONSTRUKT adds
child-audience rules, DEED adds no-legal-advice) but never loosen them —
brand law is inherited downward.

Current overlays: xsedes (master), photoshap, velos, konstrukt (carries
the KONSTRUKT/KONTRAKTOR naming flag so content surfaces it),
bobbs-kitchen, deed.

## Agents now in the system

| # | Agent | Route/Location | Brand-aware |
|---|---|---|---|
| 1 | Site Concierge | `/api/concierge` + widget | Master (extend per-venture later) |
| 2 | Content Manager | `/api/content-agent` | Edits all brands' content files |
| 3 | QA / Brand Auditor | GitHub Actions | Enforces master law repo-wide |
| 4 | **Blog Writer** | `/api/blog-agent` | ✅ `{brand, topic}` → draft PR at `src/content/blog/{brand}/` |
| 5 | **SEO Optimizer** | `/api/seo-agent` | ✅ `{brand, path}` → prioritised fix report + cross-brand link suggestions |

The Blog→SEO→Content loop: Blog Writer opens a draft PR → you review/merge
→ SEO Optimizer audits the live page → paste its "content-manager" fixes
into the Content Manager → next PR. Your role is reduced to reviewing PRs.

## Recommended next agents (in priority order for XSEDES)

**Tier 1 — build these next (high value, low complexity):**

1. **Social Repurposer.** Input: a published blog post + brand. Output:
   LinkedIn post, Instagram caption, WhatsApp Business broadcast text —
   each in brand voice, as a PR to `src/content/social/`. Reuses the
   overlay system as-is; it's basically Blog Writer with a different
   skill file. Biggest content-leverage-per-rupee in the whole roadmap.
2. **Asset Librarian.** Enforces the PhotoShap asset convention
   (`photoshap-{product-slug}-{type}-{number}.webp`, PRD §32.6) across
   all brands: a CI script that fails PRs with misnamed assets + an LLM
   pass that writes missing alt text in brand voice. Extends the
   existing QA Auditor pattern.
3. **Lead Router.** Upgrades the Concierge's lead logging: classify each
   lead by intent and brand (PhotoShap booking vs VELOS engineering
   inquiry vs partnership), then route to the right email/WhatsApp.
   Small classifier call + the Resend pattern from Prompt E.

**Tier 2 — once traffic exists:**

4. **Analytics Reporter.** Weekly cron (Vercel Cron or GitHub Actions
   schedule): pulls Vercel Analytics, summarises per-brand page
   performance and concierge conversation themes into a Monday-morning
   email. Pure digest, no write access.
5. **Performance Sentinel.** Scheduled Lighthouse CI run against key
   pages per brand; opens a GitHub issue when scores drop below the
   budgets in PLAN.md §1.
6. **Localisation Agent.** English → Malayalam variants for Kerala-market
   pages (PhotoShap wedding market especially). Human review mandatory —
   never auto-merge translations.

**Tier 3 — when the brand family grows:**

7. **Cross-Brand Consistency Agent.** Nightly diff of all
   `agents/brands/*.md` + `src/content/**` against the master skill:
   flags drift (a venture describing itself as standalone, retired
   taglines resurfacing, color violations in venture sections).
8. **Newsletter Agent.** Monthly digest assembled from the month's
   merged blog PRs across all brands, one email, sectioned per venture.
9. **Research Digest Agent.** Weekly LBE/experiential-industry scan
   (extends the earlier industry research work) → internal brief, never
   published directly.

**Deliberately NOT recommended:** auto-publishing agents (everything
stays PR-gated), auto-reply agents on social (reputation risk),
"growth-hacking" SEO agents (brand law outranks SEO, and the Optimizer
skill already refuses grey-hat tactics).

## Cost picture (Sonnet pricing, rough)
- Blog post draft: ~$0.05–0.15 each
- SEO audit: ~$0.03–0.08 per page
- Concierge: ~$0.01–0.03 per conversation
A busy month across all agents should stay in the $10–40 range. Set a
hard spend limit in the Anthropic console.
