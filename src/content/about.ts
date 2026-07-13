// About page copy — ported verbatim from website/src/pages/about.astro.
// Source is scaffold-stage: PLACEHOLDER strings are copied as-is, not
// invented. Replace before content lock.

export const aboutHero = {
  eyebrow: "§ 07 · ABOUT",
  title: "About XSEDES",
  lede: "PLACEHOLDER — company overview. XSEDES is an experiential technology partner for events, exhibitions, entertainment and live experiences, engineering physical/digital installations for agencies and venues.",
} as const

export const aboutDoctrine = {
  eyebrow: "§ DOCTRINE",
  title: "Engineered, not decorated.",
  points: [
    {
      title: "PLACEHOLDER principle one",
      body: "PLACEHOLDER — expand on the first doctrine point. This section carries real page weight, not a footnote.",
    },
    {
      title: "PLACEHOLDER principle two",
      body: "PLACEHOLDER — expand on the second doctrine point.",
    },
    {
      title: "PLACEHOLDER principle three",
      body: "PLACEHOLDER — expand on the third doctrine point.",
    },
  ],
} as const

export const aboutTeam = {
  eyebrow: "§ TEAM",
  body: "PLACEHOLDER — team/process snapshot pending real bios and org content.",
} as const

export const aboutCta = {
  label: "Get in touch →",
  href: "/contact",
} as const
