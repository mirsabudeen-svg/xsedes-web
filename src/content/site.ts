// Approved XSEDES master copy — sourced from agents/brands/xsedes.md
// and agents/skills/site-concierge.md. Do not invent marketing claims here.

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
  operatingModel: "Discover → X-Consult → X-Lab → X-Build → X-Ops",
} as const;

export type Site = typeof site;
