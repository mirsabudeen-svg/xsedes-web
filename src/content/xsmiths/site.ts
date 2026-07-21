// XSMITHS site identity — sourced from Brand Bible Foundation + Positioning.
// Do not invent proof points, case studies, or deployment counts here.

const BASE = "/xsmiths" as const

export const xsmithsSite = {
  name: "XSMITHS",
  tagline: "Engineering Interactive Experiences",
  pitch:
    "We design, engineer, fabricate, and operate interactive experiences — AI hosts, immersive installations, robotics, responsive environments — for museums, retail, hospitality, and corporate spaces.",
  oneLiner:
    "We engineer interactive environments that connect people, brands, and technology.",
  venturePrefix: "A Venture of",
  parentName: "XSEDES",
  parentHref: "https://www.xsedes.com",
  siteOrigin: "https://www.xsedes.com",
  partnerStatement:
    "XSMITHS partners with agencies, venues, and brands — we engineer the interactive systems inside experiences they produce. We do not compete as an event producer.",
  basePath: BASE,
} as const

/** Absolute canonical URL for a route under the venture. */
export const xsmithsUrl = (path = ""): string =>
  `${xsmithsSite.siteOrigin}${BASE}${path}`

/**
 * Primary navigation (IA §6.2): four rooms + wordmark as Home.
 * Deeper rooms (Studio, Industries, Technology, Journal) attach through the
 * footer sitemap and contextual links — never by widening the primary bar.
 */
export const xsmithsPrimaryNav = [
  { href: `${BASE}/products`, label: "Products" },
  { href: `${BASE}/services`, label: "Services" },
  { href: `${BASE}/about`, label: "About" },
  { href: `${BASE}/contact`, label: "Contact" },
] as const

/** Footer sitemap — the full public map of the venture (IA §6.2). */
export const xsmithsFooterNav = [
  { href: BASE, label: "Home" },
  { href: `${BASE}/products`, label: "Products" },
  { href: `${BASE}/services`, label: "Services" },
  { href: `${BASE}/industries`, label: "Industries" },
  { href: `${BASE}/technology`, label: "Technology" },
  { href: `${BASE}/studio`, label: "Studio" },
  { href: `${BASE}/journal`, label: "Journal" },
  { href: `${BASE}/about`, label: "About" },
  { href: `${BASE}/contact`, label: "Contact" },
] as const

export const homeCta = {
  lineBefore: "Let's build a space that ",
  lineAccent: "responds",
  lineAfter: ".",
} as const
