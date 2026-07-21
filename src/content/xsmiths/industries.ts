// Industry lenses — IA Part 14. Industries FILTER the universal spine; they
// never duplicate or contradict it. ~70% universal, ~30% lens.

export type IndustryLens = {
  slug: string
  name: string
  /** Industry-specific elevator line — threshold of the lens page. */
  elevator: string
  /** Product family slugs emphasized for this audience, in display order. */
  emphasizedFamilies: readonly string[]
  /** The honest engineering answer to this audience's main hesitation. */
  concernTitle: string
  concern: string
}

export const industryLenses: readonly IndustryLens[] = [
  {
    slug: "museums",
    name: "Museums & Cultural Spaces",
    elevator:
      "Exhibits that respond to visitors — engineered to educate, to endure, and to run every open hour without a technician standing beside them.",
    emphasizedFamilies: ["interact", "spaces", "ai-human", "sensorium"],
    concernTitle: "Durability and education",
    concern:
      "Museum interactives fail when they are built like trade-show demos. XSMITHS engineers for permanent duty cycles — unattended operation, maintenance access, and content that serves the curatorial story rather than the technology.",
  },
  {
    slug: "retail",
    name: "Retail & Brand Spaces",
    elevator:
      "Interactive moments that give people a reason to walk in, stay longer, and remember the brand — engineered for commercial reality, not novelty.",
    emphasizedFamilies: ["interact", "play", "connect", "immersion"],
    concernTitle: "Footfall versus gimmick",
    concern:
      "A screen that plays a loop is furniture. XSMITHS builds systems that respond to individual shoppers — participation is what turns attention into dwell time, and dwell time into a reason the space exists.",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    elevator:
      "Lobbies, restaurants, and venues where the space itself becomes part of the welcome — hosts, ambient response, and moments guests retell.",
    emphasizedFamilies: ["ai-human", "robotics", "sensorium"],
    concernTitle: "Unattended operation",
    concern:
      "Hospitality technology must work at 6 a.m. with no operator on site. Every XSMITHS system is commissioned for unattended public operation, with remote support and maintenance built into the delivery.",
  },
  {
    slug: "corporate",
    name: "Corporate & Workplace",
    elevator:
      "Lobbies, briefing centers, and campuses that express what a company builds — with the restraint and reliability an executive environment demands.",
    emphasizedFamilies: ["ai-human", "spaces", "stage", "connect"],
    concernTitle: "Brand risk and IT governance",
    concern:
      "Corporate environments carry brand and security constraints that consumer-grade installations ignore. XSMITHS engineers within IT governance — network isolation, data handling, and fail-quiet behavior are part of the design, not an exception request.",
  },
  {
    slug: "government",
    name: "Government & Public Spaces",
    elevator:
      "Civic and public installations engineered for transparency, accessibility, and long service life.",
    emphasizedFamilies: ["spaces", "interact", "connect"],
    concernTitle: "Procurement and accountability",
    concern:
      "Public projects need one accountable engineering partner, documented systems, and equipment that outlives a political cycle. XSMITHS delivers the full system — and the documentation and training to operate it.",
  },
  {
    slug: "education",
    name: "Education & Learning",
    elevator:
      "Learning environments where students participate instead of watching — engineered safe, robust, and maintainable by the institution itself.",
    emphasizedFamilies: ["interact", "play", "immersion"],
    concernTitle: "Safety and maintenance",
    concern:
      "Educational installations meet the least careful users in the building, daily. XSMITHS engineers for that reality: safe materials, serviceable assemblies, and systems the institution's own staff can operate.",
  },
  {
    slug: "entertainment",
    name: "Entertainment & Live",
    elevator:
      "Reveal systems, kinetic stages, and immersive show technology for live environments — engineered to perform on the night when nothing is allowed to fail.",
    emphasizedFamilies: ["stage", "immersion", "interact"],
    concernTitle: "On-the-night reliability",
    concern:
      "Live show technology gets no second take. As the engineering partner, XSMITHS builds show-critical systems — redundancy, rehearsal interfaces, and crew-ready control — that productions depend on. The technology is ours to engineer; the event is not ours to produce.",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Wellbeing",
    elevator:
      "Calm, multi-sensory environments and gentle interactive moments — engineered with the privacy and care a clinical setting requires.",
    emphasizedFamilies: ["sensorium", "ai-human", "interact"],
    concernTitle: "Privacy and calm",
    concern:
      "Healthcare spaces need technology that lowers the temperature of a room, never raises it. XSMITHS designs for privacy-first sensing and responses measured in comfort, not spectacle.",
  },
  {
    slug: "transport",
    name: "Transport & Airports",
    elevator:
      "Wayfinding hosts and responsive touchpoints for spaces measured in throughput — engineered to help thousands of people per day without slowing one of them down.",
    emphasizedFamilies: ["ai-human", "connect", "interact"],
    concernTitle: "Throughput and robustness",
    concern:
      "Transport environments punish fragile systems. XSMITHS engineers for continuous public duty — hardened enclosures, redundant behavior, and interactions that resolve in seconds.",
  },
] as const

export function getIndustryLens(slug: string): IndustryLens | undefined {
  return industryLenses.find((lens) => lens.slug === slug)
}
