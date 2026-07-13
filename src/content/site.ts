// Approved XSEDES master copy — extracted verbatim from the canonical
// prototype (xsedes-home.html) and section prompts. Do not invent claims.

// TODO: confirm before launch
export const contactEmail = "hello@xsedes.com"

export const site = {
  name: "XSEDES",
  legalName: "XSEDES Private Limited",
  positioning: "Experiential Technology Partner",
  tagline: "Engineering Extraordinary Event Experiences",
  oneLiner:
    "XSEDES designs, engineers, supplies and operates innovative experiential technologies that enable event professionals to deliver extraordinary experiences.",
  audience:
    "event agencies, production companies, exhibition contractors, venues, corporate event teams",
  basedIn: "Kerala, India",
  basedInShort: "Kerala · India",
  operatingModel: "Discover → X-Consult → X-Lab → X-Build → X-Ops",
  mission:
    "to empower event professionals with innovative technology, engineering expertise and reliable operational support that transforms live experiences.",
} as const

export const hero = {
  kicker: "§ 00 · Mission Brief",
  lines: ["Engineering", "Extraordinary", "Event Experiences"] as const,
  ledeBefore: "XSEDES is an ",
  ledeEmphasis: "experiential technology partner",
  ledeAfter:
    " for the events, exhibitions, entertainment and live-experiences industry. We design, engineer, supply and operate the technology that helps event professionals create unforgettable experiences.",
  primaryCta: "Begin the mission",
  secondaryCta: "Partner with us",
  scrollHint: "Scroll to clear all four stages",
} as const

export const positioning = {
  eyebrow: "§ 01 · Positioning",
  headlineBefore: "We partner with event agencies",
  headlineAccent: " — never compete with them.",
  lede:
    "XSEDES works alongside event agencies, production companies, exhibition contractors, venues and corporate event teams — providing experiential products, custom engineering and managed technical services. Your event. Our technology.",
  weAreLabel: "What we are",
  weAre: [
    "Technology partner for event professionals",
    "We engineer experiences",
    "We design, build and operate technology solutions",
  ] as const,
  weAreNotLabel: "What we are not",
  // Legitimate "are not" list — brand-lint allowlists this file for these phrases.
  weAreNot: [
    "An event management company",
    "An event organiser",
    "A competitor to agencies",
  ] as const,
} as const

export const venturesSection = {
  eyebrow: "§ 06 · Venture Portfolio",
  headlineBefore: "Built in-house",
  headlineAccent: ", incubated to stand alone.",
  lede:
    "Five ventures currently incubated inside XSEDES — each one an application of the same engineering pipeline to a different industry.",
} as const

export const final = {
  eyebrow: "§ 07 · Debrief",
  headlineBefore: "All stages cleared",
  headlineAccent: ". Now let's engineer yours.",
  lede:
    "Our mission: to empower event professionals with innovative technology, engineering expertise and reliable operational support that transforms live experiences.",
  primaryCta: "Start a conversation",
  secondaryCta: "Replay mission",
  systemLabels: ["Consult", "Lab", "Build", "Ops"] as const,
  systemStandby: "System · Standby",
  systemOperational: "System · Operational",
} as const

export const values = [
  "Innovation",
  "Engineering Excellence",
  "Reliability",
  "Partnership",
  "Integrity",
  "Continuous Learning",
] as const

export const footer = {
  copyright: "© XSEDES Private Limited",
  tagline: "Engineering Extraordinary Event Experiences",
  eyebrow: "§ Site",
} as const

export const bootGate = {
  ariaLabel: "XSEDES system boot",
  skipLabel: "Skip intro",
  wordmark: "XSEDES",
  tagline: "Experiential Technology Partner",
  progressSuffix: "% · System boot",
  cta: "Initiate mission",
  keyHint: "or press Enter",
  logLines: [
    { label: "Initialising experiential systems", status: "OK" },
    { label: "X-Consult", status: "Online" },
    { label: "X-Lab", status: "Online" },
    { label: "X-Build", status: "Online" },
    { label: "X-Ops", status: "Online" },
    { label: "Partner mode", status: "Engaged" },
  ] as const,
  sessionKey: "xsedes_boot_seen",
} as const

export const rail = {
  brand: "XSEDES",
  sub: "Experiential Technology Partner",
  progressLabel: "Mission Progress",
  systemPrefix: "System · ",
  statusStandby: "Standby",
  statusTracking: "Tracking",
  statusOperational: "Operational",
  statusInitialising: "Initialising",
  stateStandby: "Standby",
  stateLocked: "Locked",
  stateUnlocked: "Unlocked",
  stateCleared: "Cleared",
} as const

export type Site = typeof site
