// Journal registry — typed metadata for MDX bodies (IA Part 15).
// Publishing rules: one thesis per piece; link ≥1 family or services room;
// no invented clients, metrics, or outcomes; `[VERIFY]` gates publication.

import type { JournalDomain } from "./taxonomy"

export type JournalEntry = {
  slug: string
  title: string
  /** The single thesis — doubles as summary and search text. */
  thesis: string
  domain: JournalDomain
  /** ISO date — display and sitemap. */
  publishedAt: string
  readingMinutes: number
  /** Product family slugs this piece supports (IA §16.3 — never orphan). */
  relatedFamilies: readonly string[]
}

export const journalEntries: readonly JournalEntry[] = [
  {
    slug: "technology-should-disappear",
    title: "Technology should disappear",
    thesis:
      "The measure of experience technology is how little visitors think about it — machinery that gets noticed has already failed.",
    domain: "Design philosophy",
    publishedAt: "2026-07-21",
    readingMinutes: 4,
    relatedFamilies: ["ai-human", "sensorium"],
  },
  {
    slug: "reliability-is-the-wonder",
    title: "Reliability is part of the wonder",
    thesis:
      "Repeatability is what separates an installation from a demo — wonder that only happens once is a magic trick, not infrastructure.",
    domain: "Engineering",
    publishedAt: "2026-07-21",
    readingMinutes: 4,
    relatedFamilies: ["robotics", "spaces"],
  },
  {
    slug: "participation-is-the-measure",
    title: "Participation is the measure",
    thesis:
      "The honest measure of an installation is not how many people saw it — it is how many people it saw, and answered.",
    domain: "Thought leadership",
    publishedAt: "2026-07-21",
    readingMinutes: 4,
    relatedFamilies: ["interact", "play"],
  },
] as const

export function getJournalEntry(slug: string): JournalEntry | undefined {
  return journalEntries.find((entry) => entry.slug === slug)
}

/** Related pieces — same domain first, then shared family (IA §17.2). */
export function getRelatedEntries(slug: string, limit = 2): JournalEntry[] {
  const current = getJournalEntry(slug)
  if (!current) return []
  const scored = journalEntries
    .filter((entry) => entry.slug !== slug)
    .map((entry) => {
      const sharedFamilies = entry.relatedFamilies.filter((family) =>
        current.relatedFamilies.includes(family),
      ).length
      const sameDomain = entry.domain === current.domain ? 2 : 0
      return { entry, score: sameDomain + sharedFamilies }
    })
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((item) => item.entry)
}
