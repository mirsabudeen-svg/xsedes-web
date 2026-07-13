// Individual venture landing-page copy. Canonical five from ventures.ts.
// PLACEHOLDER strings mark copy still awaiting real marketing content —
// do not invent replacements here.

import { ventures } from "@/content/ventures"

export type VenturePageSlug =
  | "photoshap"
  | "velos"
  | "konstrukt"
  | "bobbs-kitchen"
  | "deed"

export type VenturePageCopy = {
  slug: VenturePageSlug
  label: string
  lede: string
}

export const venturePages: readonly VenturePageCopy[] = ventures.map((v) => ({
  slug: v.id as VenturePageSlug,
  label: v.name,
  lede: `PLACEHOLDER — ${v.name} product one-liner and hero content pending real copy and assets. (${v.oneLiner})`,
}))

export const subBrandBackLink = {
  label: "← Brands",
  href: "/brands",
} as const

export const getVenturePage = (slug: string) =>
  venturePages.find((v) => v.slug === slug)
