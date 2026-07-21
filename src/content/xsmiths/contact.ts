// Contact threshold copy (IA §8.6) — form posts to shared /api/contact.

export const contactContent = {
  title: "Start a conversation",
  lede:
    "Tell us about the space or experience you have in mind — venue type, audience, and what you want people to feel or do. We'll route your enquiry to the right team.",
  trustNote:
    "Direct enquiry only — no booking widgets or live chat.",
} as const

export const contactFormCopy = {
  fields: {
    name: "Name",
    organization: "Organization",
    email: "Email",
    productFamily: "Product family (optional)",
    message: "Message",
  },
  productFamilyPlaceholder: "Any / not sure",
  submit: "Send enquiry",
  sending: "Sending…",
  success: "Received — we'll be in touch.",
  error: "Something went wrong. Please try again.",
} as const
