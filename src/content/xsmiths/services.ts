// Three service pillars mapped to XSEDES divisions — doctrine requirement.

import { productFamilies } from "./products"

export type ServicePillar = {
  slug: string
  name: string
  division: string
  capabilities: readonly string[]
  /** Day-to-day scope — derived from capabilities and division mapping only. */
  summary: string
  /** Product family slugs this pillar most often supports (IA §8.5 cross-links). */
  relatedFamilies: readonly string[]
}

export const servicePillars: readonly ServicePillar[] = [
  {
    slug: "strategy-design",
    name: "Strategy & Design",
    division: "X-Consult / X-Lab",
    capabilities: [
      "Experience strategy",
      "Visitor journey design",
      "Concept development",
      "Spatial planning",
      "Industrial and UI/UX design",
    ],
    summary:
      "Through X-Consult and X-Lab, this pillar works with agencies and venues before anything is built — shaping experience strategy and visitor journeys, developing concepts, planning how a space is organized, and designing the industrial and interface details that engineering will fabricate.",
    relatedFamilies: ["spaces", "immersion", "ai-human", "interact"],
  },
  {
    slug: "engineering-fabrication",
    name: "Engineering & Fabrication",
    division: "X-Build",
    capabilities: [
      "Software, AI, and XR development",
      "Robotics integration",
      "Electronics and sensor integration",
      "Scenic fabrication",
      "AV and show control systems",
    ],
    summary:
      "Through X-Build, this pillar turns an approved concept into a working installation — developing software, AI, and XR; integrating robotics, electronics, and sensors; fabricating scenic elements; and engineering AV and show control so the experience responds reliably in a real venue.",
    relatedFamilies: productFamilies.map((family) => family.slug),
  },
  {
    slug: "operations",
    name: "Operations",
    division: "X-Ops",
    capabilities: [
      "Installation and commissioning",
      "Technical crew",
      "Maintenance",
      "Remote support",
      "Visitor analytics and reporting",
    ],
    summary:
      "Through X-Ops, this pillar carries systems from install to long-term operation — commissioning on site, providing technical crew when needed, maintaining hardware and software, supporting remotely when attention is required, and reporting on how visitors engage with the space.",
    relatedFamilies: ["spaces", "robotics", "stage", "connect"],
  },
] as const

/** Services overview threshold (IA §8.5). */
export const servicesOverview = {
  title: "How we deliver",
} as const

/** Shared services lede — homepage Scene 04 and /services threshold. */
export const servicesIntro =
  "Professional services are delivered through XSEDES's existing divisions — not a separate service org." as const

export function getServicePillar(slug: string): ServicePillar | undefined {
  return servicePillars.find((pillar) => pillar.slug === slug)
}
