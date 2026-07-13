import type { Metadata } from "next"
import ContactContent from "@/components/pages/ContactContent"

export const metadata: Metadata = {
  title: "CONTACT — XSEDES",
  description: "Start a project with XSEDES.",
}

export default function ContactPage() {
  return <ContactContent />
}
