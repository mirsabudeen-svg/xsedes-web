// Venture one-liners extracted from agents/skills/site-concierge.md
// and agents/brands/*.md. Ventures are incubated inside XSEDES.

export type Venture = {
  id: "photoshap" | "velos" | "konstrukt" | "bobbs-kitchen" | "deed";
  name: "PhotoShap" | "VELOS" | "KONSTRUKT" | "Bobb's Kitchen" | "DEED";
  oneLiner: string;
};

export const ventures: readonly Venture[] = [
  {
    id: "photoshap",
    name: "PhotoShap",
    oneLiner:
      "AI-powered photo booths, video booths and interactive guest engagement systems.",
  },
  {
    id: "velos",
    name: "VELOS",
    oneLiner: "intelligent reveal systems, motion engineering, kinetic displays.",
  },
  {
    id: "konstrukt",
    name: "KONSTRUKT",
    oneLiner:
      "AI-powered learning platform for children — 3D printing, robotics, digital manufacturing.",
  },
  {
    id: "bobbs-kitchen",
    name: "Bobb's Kitchen",
    oneLiner: "AI-powered customised apparel retail with on-demand manufacturing.",
  },
  {
    id: "deed",
    name: "DEED",
    oneLiner: "AI-powered intellectual property intelligence and advisory.",
  },
] as const;
