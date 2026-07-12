// Venture copy extracted verbatim from the canonical prototype
// (xsedes-home.html). Ventures are incubated inside XSEDES.

export type Venture = {
  id: "photoshap" | "velos" | "konstrukt" | "bobbs-kitchen" | "deed"
  name: "PhotoShap" | "VELOS" | "KONSTRUKT" | "Bobb's Kitchen" | "DEED"
  industry: string
  oneLiner: string
}

export const ventures: readonly Venture[] = [
  {
    id: "photoshap",
    name: "PhotoShap",
    industry: "Events & Experiential Technology",
    oneLiner:
      "AI-powered photo booths, video booths and interactive guest engagement systems.",
  },
  {
    id: "velos",
    name: "VELOS",
    industry: "Motion & Automation",
    oneLiner:
      "Intelligent reveal systems, motion engineering and kinetic display technologies.",
  },
  {
    id: "konstrukt",
    name: "KONSTRUKT",
    industry: "Education Technology",
    oneLiner:
      "AI-powered learning platform for children focused on 3D printing, robotics and digital manufacturing.",
  },
  {
    id: "bobbs-kitchen",
    name: "Bobb's Kitchen",
    industry: "Retail Technology",
    oneLiner:
      "AI-powered customised apparel retail platform with on-demand manufacturing and interactive retail experiences.",
  },
  {
    id: "deed",
    name: "DEED",
    industry: "LegalTech / AI",
    oneLiner:
      "AI-powered intellectual property intelligence platform and advisory services.",
  },
] as const
