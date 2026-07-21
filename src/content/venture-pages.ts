// Individual venture landing-page copy — derived from canonical ventures.ts.

import { ventures } from "@/content/ventures"

export type VenturePageSlug =
  | "photoshap"
  | "velos"
  | "konstrukt"
  | "bobbs-kitchen"
  | "deed"
  | "xsmiths"

export type VenturePageCopy = {
  slug: VenturePageSlug
  label: string
  industry: string
  lede: string
}

export const venturePages: readonly VenturePageCopy[] = ventures.map((v) => ({
  slug: v.id as VenturePageSlug,
  label: v.name,
  industry: v.industry,
  lede: v.oneLiner,
}))

export const subBrandBackLink = {
  label: "← Brands",
  href: "/brands",
} as const

export const ventureChrome = {
  contactLabel: "Contact",
  contactHref: "/contact",
  homeAria: "XSEDES home",
} as const

export const getVenturePage = (slug: string) =>
  venturePages.find((v) => v.slug === slug)
