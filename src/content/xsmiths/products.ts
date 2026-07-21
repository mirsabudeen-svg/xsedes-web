// Nine product families — canonical names and order from Positioning.
// Numbering encodes meaning (IA Part 13); never reorder.

import type { IndustryContext } from "./taxonomy"

export type ProductFamily = {
  slug: string
  number: string
  name: string
  focus: string
  description: string
  contexts: readonly IndustryContext[]
}

export const productFamilies: readonly ProductFamily[] = [
  {
    slug: "ai-human",
    number: "01",
    name: "AI HUMAN",
    focus:
      "Digital humans & AI assistants — hosts, concierges, guides, brand ambassadors",
    description:
      "AI HUMAN covers digital humans and AI assistants engineered to host, guide, and represent a brand in physical space — from concierge interactions to exhibit guides — designed to feel natural in the room rather than bolted onto a screen.",
    contexts: ["Museums", "Airports", "Retail", "Hospitality", "Corporate lobbies"],
  },
  {
    slug: "immersion",
    number: "02",
    name: "IMMERSION",
    focus:
      "XR experiences — VR walkthroughs, digital twins, mixed reality installations",
    description:
      "IMMERSION delivers XR experiences that put people inside a spatial story — VR walkthroughs, digital twins, and mixed-reality installations engineered for real venues and real dwell times.",
    contexts: ["Museums", "Retail", "Industrial training", "Exhibitions"],
  },
  {
    slug: "interact",
    number: "03",
    name: "INTERACT",
    focus:
      "Interactive installations — walls, floors, projection mapping, gesture and touch systems",
    description:
      "INTERACT is the family of interactive installations — walls, floors, projection mapping, and gesture or touch systems — that turn surfaces into responsive interfaces visitors can engage with directly.",
    contexts: ["Exhibitions", "Museums", "Retail", "Public spaces"],
  },
  {
    slug: "connect",
    number: "04",
    name: "CONNECT",
    focus:
      "Smart networking — NFC/digital business cards, lead capture, visitor analytics",
    description:
      "CONNECT covers smart networking systems for experiences that need identity, lead capture, and visitor analytics — NFC and digital touchpoints engineered into the journey rather than added as an afterthought.",
    contexts: ["Corporate events", "Exhibitions", "Conferences"],
  },
  {
    slug: "play",
    number: "05",
    name: "PLAY",
    focus:
      "Gamification — interactive games, quiz walls, motion and touch-based challenges",
    description:
      "PLAY brings gamification into physical space — interactive games, quiz walls, and motion or touch-based challenges that invite people to participate rather than only observe.",
    contexts: ["Retail", "Exhibitions", "Hospitality", "Corporate events"],
  },
  {
    slug: "robotics",
    number: "06",
    name: "ROBOTICS",
    focus:
      "Physical intelligence — talking installations, service robots, animatronics",
    description:
      "ROBOTICS is physical intelligence in the room — talking installations, service robots, and animatronics engineered to operate reliably in public, often unattended environments.",
    contexts: ["Corporate lobbies", "Retail", "Hospitality", "Museums"],
  },
  {
    slug: "sensorium",
    number: "07",
    name: "SENSORIUM",
    focus:
      "Multi-sensory experiences — scent, sound, lighting, environmental storytelling",
    description:
      "SENSORIUM composes multi-sensory experiences — scent, sound, lighting, and environmental storytelling — so a space can carry emotion through more than sight alone.",
    contexts: ["Museums", "Retail", "Hospitality", "Brand experiences"],
  },
  {
    slug: "stage",
    number: "08",
    name: "STAGE",
    focus:
      "Live experience technology — reveal systems, kinetic installations, projection stages",
    description:
      "STAGE covers live experience technology — reveal systems, kinetic installations, and projection stages — engineered for the moment an audience needs something physical to transform on cue.",
    contexts: ["Corporate events", "Exhibitions", "Live activations"],
  },
  {
    slug: "spaces",
    number: "09",
    name: "SPACES",
    focus:
      "Permanent installations — visitor centers, brand museums, experience centers, smart campuses",
    description:
      "SPACES is for permanent installations — visitor centers, brand museums, experience centers, and smart campuses — where interactive systems must run as part of the building, not as a temporary activation.",
    contexts: [
      "Visitor centers",
      "Brand museums",
      "Experience centers",
      "Smart campuses",
    ],
  },
] as const

/** Products overview threshold (IA §8.3). */
export const productsOverview = {
  title: "Product ecosystem",
  lede: "Nine product families, organized by capability.",
} as const

export function getProductFamily(slug: string): ProductFamily | undefined {
  return productFamilies.find((family) => family.slug === slug)
}

/** Previous / next family for quiet room-to-room wayfinding (IA §6.2). */
export function getAdjacentFamilies(slug: string): {
  previous: ProductFamily | undefined
  next: ProductFamily | undefined
} {
  const index = productFamilies.findIndex((family) => family.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }
  return {
    previous: productFamilies[index - 1],
    next: productFamilies[index + 1],
  }
}
