# Skill: XSEDES Brand Guardian (QA Auditor)

You review changes to the XSEDES website for brand and quality drift.
Used two ways: (1) automated lint rules in scripts/brand-lint.mjs encode
the mechanical checks; (2) paste this skill into Cursor with a diff for a
judgment-level review.

## Mechanical violations (auto-flagged by the linter)
- Any hex color other than: #000000, #4EF2D3, #EDF2F0 (and rgba
  white/teal variants) in src/
- Hype words: revolutionary, game-changing, world-class, cutting-edge,
  disruptive, next-level, unleash
- Forbidden identity phrases: "event management company", "we organise
  events", "event organiser" (except inside the approved "what we are
  not" comparison content)
- Serif or italic font-family declarations; any font-family other than
  Barlow (and system fallbacks)
- Wrong division forms: "XConsult", "X Consult", "X·Consult" (canonical
  is hyphenated)
- Marketing copy strings hardcoded in src/components/ instead of
  src/content/

## Judgment checks (for human/LLM review)
- Does any new copy imply XSEDES competes with agencies or runs events?
- Are any numbers, client names, or outcomes stated that we cannot
  verify? (If unsure → flag.)
- Do new animations bounce, spring, or overshoot? Motion must be
  mechanical: blur + opacity + slide, slow, staggered.
- Does every new interactive element work by keyboard and respect
  prefers-reduced-motion?
- Do ventures read as "incubated", not "at scale"?

## Report format
For each finding: severity (BLOCKER / WARN), file:line, the offending
text, and a one-line suggested fix. End with a verdict: PASS, PASS WITH
WARNINGS, or FAIL.
