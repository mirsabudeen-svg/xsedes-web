// Case study index data — titles/industries for filtering; full narratives
// marked as in preparation until client-cleared copy ships.

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

const prep = {
  problem:
    "Client brief and constraints are being packaged for publication. Contact XSEDES for the full project narrative.",
  approach:
    "Engineering approach follows the XSEDES operating model — consult, lab, build and ops as required by the brief.",
  build:
    "Fabrication and systems detail will be published with approved photography and drawings.",
  outcome:
    "Measured outcomes will be shared once cleared for public reference — no invented statistics.",
  coverAlt: "Case study cover imagery in preparation",
  body: "Full project narrative in preparation. Use Contact to request a private walkthrough of relevant work.",
} as const

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "arena-activation",
    title: "Arena Brand Activation",
    division: "x-ops",
    industry: "Sports & Live Events",
    summary:
      "Technical operations and live deployment support for a large-format brand activation.",
    problem: prep.problem,
    approach: prep.approach,
    build: prep.build,
    outcome: prep.outcome,
    coverAlt: prep.coverAlt,
    publishedAt: "2026-01-08",
    body: prep.body,
  },
  {
    slug: "atlantis-exhibit",
    title: "Atlantis — Submerged Exhibit System",
    division: "x-build",
    industry: "Museum & Exhibition",
    summary:
      "Custom engineered exhibit system for an immersive museum environment.",
    problem: prep.problem,
    approach: prep.approach,
    build: prep.build,
    outcome: prep.outcome,
    coverAlt: prep.coverAlt,
    publishedAt: "2026-01-01",
    body: prep.body,
  },
  {
    slug: "prototype-lab-rig",
    title: "Interactive Robotics Prototype Rig",
    division: "x-lab",
    industry: "Brand Activation",
    summary:
      "Rapid prototype of an interactive robotics rig for brand experience testing.",
    problem: prep.problem,
    approach: prep.approach,
    build: prep.build,
    outcome: prep.outcome,
    coverAlt: prep.coverAlt,
    publishedAt: "2026-01-15",
    body: prep.body,
  },
  {
    slug: "venue-systems-consult",
    title: "Venue Systems Feasibility Study",
    division: "x-consult",
    industry: "Museum & Exhibition",
    summary:
      "Feasibility and systems architecture study for a venue technology programme.",
    problem: prep.problem,
    approach: prep.approach,
    build: prep.build,
    outcome: prep.outcome,
    coverAlt: prep.coverAlt,
    publishedAt: "2026-01-22",
    body: prep.body,
  },
] as const

export const workPageStrings = {
  eyebrow: "§ 05 · WORK",
  title: "Case studies",
  divisionFilterLabel: "Division",
  industryFilterLabel: "Industry",
  all: "All",
  noResults: "No case studies match these filters.",
  coverPlaceholder: "Cover imagery in preparation",
  backToWork: "← All work",
  cta: "Start a project →",
} as const
