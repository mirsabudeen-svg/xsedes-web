// XSMITHS controlled vocabularies — IA v1.0 Part 20.2.
// Every publishable node references these; freeform tags are prohibited.

export const narrativeStages = [
  "arrival",
  "curiosity",
  "recognition",
  "wonder",
  "discovery",
  "understanding",
  "confidence",
  "trust",
  "conversation",
] as const

export type NarrativeStage = (typeof narrativeStages)[number]

export const industryContexts = [
  "Museums",
  "Retail",
  "Hospitality",
  "Corporate",
  "Government",
  "Education",
  "Entertainment",
  "Healthcare",
  "Transport",
  "Airports",
  "Exhibitions",
  "Conferences",
  "Corporate events",
  "Corporate lobbies",
  "Public spaces",
  "Live activations",
  "Industrial training",
  "Brand experiences",
  "Visitor centers",
  "Brand museums",
  "Experience centers",
  "Smart campuses",
] as const

export type IndustryContext = (typeof industryContexts)[number]

/**
 * Proof Standard gate (IA §20.2 / Brand doctrine): only `public-verified`
 * content may render on a public surface. Nothing below that level is a
 * publishable claim.
 */
export const proofStatuses = ["none", "internal", "public-verified"] as const

export type ProofStatus = (typeof proofStatuses)[number]

export const journalDomains = [
  "Design philosophy",
  "Engineering",
  "Thought leadership",
] as const

export type JournalDomain = (typeof journalDomains)[number]
