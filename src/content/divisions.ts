// Division copy extracted verbatim from the canonical prototype
// (xsedes-home.html). Order is canonical and must not change.

export type DivisionId = "x-consult" | "x-lab" | "x-build" | "x-ops"
export type StageKey = "discover" | "consult" | "lab" | "build" | "ops"

export type Division = {
  id: DivisionId
  stageKey: Exclude<StageKey, "discover">
  name: "X-Consult" | "X-Lab" | "X-Build" | "X-Ops"
  stageIndex: 1 | 2 | 3 | 4
  sectionId: string
  eyebrow: string
  functions: readonly string[]
  outcome: string
}

export const divisions: readonly Division[] = [
  {
    id: "x-consult",
    stageKey: "consult",
    name: "X-Consult",
    stageIndex: 1,
    sectionId: "s-consult",
    eyebrow: "§ 02 · Operating Model",
    functions: [
      "Experience strategy & event tech consulting",
      "Innovation workshops & feasibility studies",
      "Solution architecture & technical advisory",
    ],
    outcome: "Problems become executable plans.",
  },
  {
    id: "x-lab",
    stageKey: "lab",
    name: "X-Lab",
    stageIndex: 2,
    sectionId: "s-lab",
    eyebrow: "§ 03 · Operating Model",
    functions: [
      "Product innovation & industrial design",
      "AI research, experience design & rapid prototyping",
      "Intellectual property & product roadmaps",
    ],
    outcome: "Ideas become products.",
  },
  {
    id: "x-build",
    stageKey: "build",
    name: "X-Build",
    stageIndex: 3,
    sectionId: "s-build",
    eyebrow: "§ 04 · Operating Model",
    functions: [
      "Mechanical engineering, electronics & robotics",
      "Fabrication, software development & hardware assembly",
      "Installation & systems integration",
    ],
    outcome: "Designs become real-world solutions.",
  },
  {
    id: "x-ops",
    stageKey: "ops",
    name: "X-Ops",
    stageIndex: 4,
    sectionId: "s-ops",
    eyebrow: "§ 05 · Operating Model",
    functions: [
      "Technical operations, equipment rentals & event deployment",
      "Maintenance, remote monitoring & training",
      "Customer success & annual support",
    ],
    outcome: "Technology performs reliably at scale.",
  },
] as const

/** Rail / scroll stages including Discover (hero). */
export type MissionStage = {
  key: StageKey
  name: string
  sectionId: string
  idleState: string
  doneState: string
}

export const missionStages: readonly MissionStage[] = [
  {
    key: "discover",
    name: "Discover",
    sectionId: "s-discover",
    idleState: "Standby",
    doneState: "Cleared",
  },
  {
    key: "consult",
    name: "X-Consult",
    sectionId: "s-consult",
    idleState: "Locked",
    doneState: "Cleared",
  },
  {
    key: "lab",
    name: "X-Lab",
    sectionId: "s-lab",
    idleState: "Locked",
    doneState: "Cleared",
  },
  {
    key: "build",
    name: "X-Build",
    sectionId: "s-build",
    idleState: "Locked",
    doneState: "Cleared",
  },
  {
    key: "ops",
    name: "X-Ops",
    sectionId: "s-ops",
    idleState: "Locked",
    doneState: "Cleared",
  },
] as const

export const stageTagIdle = (index: 1 | 2 | 3 | 4) =>
  `Stage 0${index} / 04`

export const stageTagDone = (index: 1 | 2 | 3 | 4) =>
  `Stage 0${index} / 04 · Cleared`
