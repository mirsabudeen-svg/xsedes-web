// Studio — method + craft culture (IA §4.4). Stage-honest: describes how
// the studio works; makes no claims about volume, clients, or outcomes.

export const studioContent = {
  title: "The studio",
  lede: "XSMITHS is an experience engineering studio — one team responsible for the story, the space, the interaction, the technology, and the operation. Accountability is designed to stay in one place: strategy, design, engineering, fabrication, and operations held together rather than scattered across handoffs.",
  methodTitle: "Method",
  methodLede:
    "Every project moves through the same engineering sequence. The stages are how an idea survives contact with a real venue, a real crowd, and a real opening date.",
  method: [
    {
      number: "01",
      name: "Discover",
      detail:
        "Understand the space, the visitors, and the story the experience must carry — before any technology is chosen. Delivered through X-Consult.",
    },
    {
      number: "02",
      name: "Imagine",
      detail:
        "Define what the experience must do for the people in it, and what it must never do — then resolve intent into spatial, industrial, and interaction design. Delivered through X-Consult.",
    },
    {
      number: "03",
      name: "Engineer",
      detail:
        "Software, AI, electronics, sensors, and robotics are developed as one system with one owner. Delivered through X-Lab.",
    },
    {
      number: "04",
      name: "Fabricate",
      detail:
        "Scenic fabrication, AV integration, and show control bring the system into physical form. Delivered through X-Build.",
    },
    {
      number: "05",
      name: "Integrate",
      detail:
        "Mechanical, electrical, media, and control subsystems are unified and tested as one installation — not a collection of vendor parts. Delivered through X-Build.",
    },
    {
      number: "06",
      name: "Activate",
      detail:
        "Installation, commissioning, and hardening for unattended public operation — the go-live that proves the system in the real venue. Delivered through X-Build.",
    },
    {
      number: "07",
      name: "Operate",
      detail:
        "Monitoring, remote support, and technical crew keep the experience running in public through service life. Delivered through X-Ops.",
    },
    {
      number: "08",
      name: "Evolve",
      detail:
        "Maintenance, measured iteration, and long-term adaptation keep the experience current as the venue and audience change. Delivered through X-Ops.",
    },
  ],
  cultureTitle: "Craft culture",
  culture: [
    {
      name: "Engineers first",
      detail:
        "The emotion is the point — the engineering is how it gets there without breaking on the second day, the hundredth visitor, or the moment the network hiccups.",
    },
    {
      name: "Reliability is craft",
      detail:
        "Reliability is not the boring part of this work. It is the part that makes the wonder repeatable.",
    },
    {
      name: "One team, no handoffs",
      detail:
        "Most interactive projects fail in the seams between vendors. XSMITHS removes the seams: strategy, design, engineering, fabrication, and operations belong to one accountable team.",
    },
    {
      name: "Partners, not producers",
      detail:
        "The studio builds the interactive systems inside experiences that agencies, venues, and brands produce. It never competes for the event itself.",
    },
  ],
} as const
