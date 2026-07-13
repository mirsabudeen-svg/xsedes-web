// Extra copy for the /divisions/[slug] detail pages — ported verbatim from
// website/src/pages/divisions/[slug].astro. PLACEHOLDER strings are copied
// as-is. Pairs with the canonical division data in src/content/divisions.ts
// (id, name, outcome) — do not duplicate that data here.

import type { DivisionId } from "@/content/divisions"

export type DivisionPageCopy = {
  id: DivisionId
  capabilities: readonly [string, string, string, string]
  process: string
}

export const divisionPages: readonly DivisionPageCopy[] = [
  {
    id: "x-consult",
    capabilities: [
      "PLACEHOLDER — capability one for X-Consult.",
      "PLACEHOLDER — capability two for X-Consult.",
      "PLACEHOLDER — capability three for X-Consult.",
      "PLACEHOLDER — capability four for X-Consult.",
    ],
    process:
      "PLACEHOLDER — team/process snapshot for X-Consult: how an engagement moves from brief to delivery within this division.",
  },
  {
    id: "x-lab",
    capabilities: [
      "PLACEHOLDER — capability one for X-Lab.",
      "PLACEHOLDER — capability two for X-Lab.",
      "PLACEHOLDER — capability three for X-Lab.",
      "PLACEHOLDER — capability four for X-Lab.",
    ],
    process:
      "PLACEHOLDER — team/process snapshot for X-Lab: how an engagement moves from brief to delivery within this division.",
  },
  {
    id: "x-build",
    capabilities: [
      "PLACEHOLDER — capability one for X-Build.",
      "PLACEHOLDER — capability two for X-Build.",
      "PLACEHOLDER — capability three for X-Build.",
      "PLACEHOLDER — capability four for X-Build.",
    ],
    process:
      "PLACEHOLDER — team/process snapshot for X-Build: how an engagement moves from brief to delivery within this division.",
  },
  {
    id: "x-ops",
    capabilities: [
      "PLACEHOLDER — capability one for X-Ops.",
      "PLACEHOLDER — capability two for X-Ops.",
      "PLACEHOLDER — capability three for X-Ops.",
      "PLACEHOLDER — capability four for X-Ops.",
    ],
    process:
      "PLACEHOLDER — team/process snapshot for X-Ops: how an engagement moves from brief to delivery within this division.",
  },
] as const

export const divisionPageStrings = {
  capabilitiesEyebrow: "§ CAPABILITIES",
  proofEyebrow: "§ PROOF",
  proofEmpty: "No published case studies for this division yet.",
  processEyebrow: "§ PROCESS",
  cta: "Start a project →",
} as const
