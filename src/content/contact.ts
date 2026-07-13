// Contact page copy — ported verbatim from website/src/pages/contact.astro.
// The form posts to /api/contact for UI parity with the Astro source's
// Cloudflare Pages Function (functions/api/contact.ts) — that serverless
// handler was NOT ported (see task notes); the route does not exist yet
// in this Next.js app, so submissions will fail until it is wired up.

export const contactHero = {
  eyebrow: "§ CONTACT",
  title: "Start a project",
  lede: "Tell us what you're building. We'll route it to the right division.",
} as const

export const contactForm = {
  fields: {
    name: "Name",
    email: "Email",
    company: "Company",
    division: "Division",
    message: "Project brief",
  },
  divisionPlaceholder: "Not sure — route for me",
  divisionOptions: [
    { value: "x-consult", label: "X-Consult" },
    { value: "x-lab", label: "X-Lab" },
    { value: "x-build", label: "X-Build" },
    { value: "x-ops", label: "X-Ops" },
  ],
  submit: "Send →",
  sending: "Sending…",
  success: "Sent. We'll be in touch shortly.",
  error: "Something went wrong — email us directly or try again.",
} as const
