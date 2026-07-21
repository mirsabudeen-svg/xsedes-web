// MDX body imports — registry metadata lives in journal.ts.

import type { ComponentType } from "react"
import ParticipationIsTheMeasure from "./journal/participation-is-the-measure.mdx"
import ReliabilityIsTheWonder from "./journal/reliability-is-the-wonder.mdx"
import TechnologyShouldDisappear from "./journal/technology-should-disappear.mdx"

export type JournalBodyComponent = ComponentType

export const journalBodies: Record<string, JournalBodyComponent> = {
  "technology-should-disappear": TechnologyShouldDisappear,
  "reliability-is-the-wonder": ReliabilityIsTheWonder,
  "participation-is-the-measure": ParticipationIsTheMeasure,
}

export function getJournalBody(slug: string): JournalBodyComponent | undefined {
  return journalBodies[slug]
}
