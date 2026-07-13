// Brand/venture directory for /brands — aligned to canonical doctrine in
// src/content/ventures.ts (PhotoShap, VELOS, KONSTRUKT, Bobb's Kitchen, DEED).
// NEOPAY, SKETCHBOT, and BOBB were dropped; KONTRAKTOR renamed to KONSTRUKT.

import { ventures } from "@/content/ventures"

export type BrandDirectoryEntry = {
  slug: string
  label: string
  tagline: string
  /** All canonical ventures are native routes in this app. */
  pattern: "A"
}

export const brandDirectory: readonly BrandDirectoryEntry[] = ventures.map(
  (v) => ({
    slug: v.id,
    label: v.name,
    tagline: v.oneLiner,
    pattern: "A" as const,
  }),
)

export const brandsPageStrings = {
  eyebrow: "§ 06 · BRANDS",
  title: "Brands under XSEDES",
  intro:
    "Five ventures currently incubated inside XSEDES — each one an application of the same engineering pipeline to a different industry.",
  patternA: "XSEDES-hosted",
  patternB: "Independent deployment",
} as const
