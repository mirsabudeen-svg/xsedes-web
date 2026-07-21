// Case study engine — IA Part 12. STRUCTURE approved; CONTENT gated by the
// Proof Standard: only entries with proofStatus "public-verified" (signed off
// by the owner) may render publicly. No entry may be invented by any author,
// human or AI. The engine ships empty on purpose.

import type { IndustryContext, ProofStatus } from "./taxonomy"

/** The eight canonical case-study beats — Challenge → Future (IA §12). */
export type CaseStudyBeat = {
  name:
    | "Challenge"
    | "Insight"
    | "Concept"
    | "Engineering"
    | "Build"
    | "Interaction"
    | "Outcome"
    | "Future"
  /** 1–3 short paragraphs. Outcome may contain verified facts only. */
  paragraphs: readonly string[]
}

export type CaseStudy = {
  slug: string
  title: string
  /** Effect-first summary — what visitors experienced, not what was installed. */
  effect: string
  productFamilies: readonly string[]
  industryContexts: readonly IndustryContext[]
  proofStatus: ProofStatus
  /** Named human who verified every fact (required for publication). */
  verifiedBy?: string
  completedAt?: string
  beats: readonly CaseStudyBeat[]
}

/**
 * Registry. Entries below "public-verified" exist for internal preview and
 * template development only — they are excluded from routes, sitemaps, and
 * static params by `getPublishedCaseStudies`.
 */
export const caseStudies: readonly CaseStudy[] = []

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter(
    (study) => study.proofStatus === "public-verified" && study.verifiedBy,
  )
}

export function getPublishedCaseStudy(slug: string): CaseStudy | undefined {
  return getPublishedCaseStudies().find((study) => study.slug === slug)
}
