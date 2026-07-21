// Extra copy for /divisions/[slug] — capabilities aligned with home stage functions.

import type { DivisionId } from "@/content/divisions"
import { divisions } from "@/content/divisions"

export type DivisionPageCopy = {
  id: DivisionId
  capabilities: readonly [string, string, string, string]
  process: string
}

const processById: Record<DivisionId, string> = {
  "x-consult":
    "Brief → discovery workshops → feasibility and architecture → executable plan handed to Lab or Build.",
  "x-lab":
    "Opportunity → research and prototyping → design validation → product roadmap and IP packaging.",
  "x-build":
    "Approved design → engineering and fabrication → software/hardware integration → install-ready system.",
  "x-ops":
    "Deploy → operate and monitor → train crews → sustain with rental, maintenance and annual support.",
}

export const divisionPages: readonly DivisionPageCopy[] = divisions.map((d) => {
  const f = d.functions
  const capabilities: [string, string, string, string] = [
    f[0] ?? d.outcome,
    f[1] ?? d.outcome,
    f[2] ?? d.outcome,
    d.outcome,
  ]
  return {
    id: d.id,
    capabilities,
    process: processById[d.id],
  }
})

export const divisionPageStrings = {
  capabilitiesEyebrow: "§ CAPABILITIES",
  proofEyebrow: "§ PROOF",
  proofEmpty: "No published case studies for this division yet.",
  processEyebrow: "§ PROCESS",
  cta: "Start a project →",
} as const
