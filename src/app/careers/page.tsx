import type { Metadata } from "next"
import CareersContent from "@/components/pages/CareersContent"

export const metadata: Metadata = {
  title: "CAREERS — XSEDES",
  description: "Careers at XSEDES.",
}

export default function CareersPage() {
  return <CareersContent />
}
