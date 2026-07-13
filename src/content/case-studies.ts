// Case study data — ported verbatim from website/src/content/case-studies/*.md
// (Astro content collection). This app has no MDX/content-collections setup,
// so the four entries are inlined here as typed data instead. PLACEHOLDER
// strings are copied as-is from the source frontmatter/body — real project
// narratives, photography and measured outcomes are still pending.

import type { DivisionId } from "@/content/divisions"

export type CaseStudy = {
  slug: string
  title: string
  division: DivisionId
  industry: string
  summary: string
  problem: string
  approach: string
  build: string
  outcome: string
  coverAlt: string
  /** ISO date string, matches the source frontmatter `publishedAt`. */
  publishedAt: string
  body: string
}

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "arena-activation",
    title: "Arena Brand Activation",
    division: "x-ops",
    industry: "Sports & Live Events",
    summary: "PLACEHOLDER — one-line summary pending real copy.",
    problem: "PLACEHOLDER — the problem statement as briefed by the client.",
    approach: "PLACEHOLDER — the engineering approach XSEDES took.",
    build: "PLACEHOLDER — what was physically fabricated and installed.",
    outcome: "PLACEHOLDER — measured or observed outcome, no invented stats.",
    coverAlt: "PLACEHOLDER — CAD/photography alt text for the cover image.",
    publishedAt: "2026-01-08",
    body: "Placeholder case study body copy — replace with real project narrative before content lock.",
  },
  {
    slug: "atlantis-exhibit",
    title: "Atlantis — Submerged Exhibit System",
    division: "x-build",
    industry: "Museum & Exhibition",
    summary:
      "PLACEHOLDER — one-line summary of the Atlantis build pending real copy.",
    problem: "PLACEHOLDER — the problem statement as briefed by the client.",
    approach: "PLACEHOLDER — the engineering approach XSEDES took.",
    build: "PLACEHOLDER — what was physically fabricated and installed.",
    outcome: "PLACEHOLDER — measured or observed outcome, no invented stats.",
    coverAlt: "PLACEHOLDER — CAD/photography alt text for the cover image.",
    publishedAt: "2026-01-01",
    body: "Placeholder case study body copy — replace with real project narrative before content lock.",
  },
  {
    slug: "prototype-lab-rig",
    title: "Interactive Robotics Prototype Rig",
    division: "x-lab",
    industry: "Brand Activation",
    summary: "PLACEHOLDER — one-line summary pending real copy.",
    problem: "PLACEHOLDER — the problem statement as briefed by the client.",
    approach: "PLACEHOLDER — the engineering approach XSEDES took.",
    build: "PLACEHOLDER — what was physically fabricated and installed.",
    outcome: "PLACEHOLDER — measured or observed outcome, no invented stats.",
    coverAlt: "PLACEHOLDER — CAD/photography alt text for the cover image.",
    publishedAt: "2026-01-15",
    body: "Placeholder case study body copy — replace with real project narrative before content lock.",
  },
  {
    slug: "venue-systems-consult",
    title: "Venue Systems Feasibility Study",
    division: "x-consult",
    industry: "Museum & Exhibition",
    summary: "PLACEHOLDER — one-line summary pending real copy.",
    problem: "PLACEHOLDER — the problem statement as briefed by the client.",
    approach: "PLACEHOLDER — the engineering approach XSEDES took.",
    build: "PLACEHOLDER — what was physically fabricated and installed.",
    outcome: "PLACEHOLDER — measured or observed outcome, no invented stats.",
    coverAlt: "PLACEHOLDER — CAD/photography alt text for the cover image.",
    publishedAt: "2026-01-22",
    body: "Placeholder case study body copy — replace with real project narrative before content lock.",
  },
] as const

export const workPageStrings = {
  eyebrow: "§ 05 · WORK",
  title: "Case studies",
  divisionFilterLabel: "Division",
  industryFilterLabel: "Industry",
  all: "All",
  noResults: "No case studies match these filters.",
  coverPlaceholder: "PLACEHOLDER — cover CAD still / fabrication photography",
  backToWork: "← All work",
  cta: "Start a project →",
} as const
