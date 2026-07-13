import type { Metadata } from "next"
import LegalContent from "@/components/pages/LegalContent"
import { termsPage } from "@/content/legal"

export const metadata: Metadata = {
  title: "TERMS OF SERVICE — XSEDES",
  description: "XSEDES terms of service.",
}

export default function TermsPage() {
  return (
    <LegalContent
      sectionId="s-legal-terms"
      eyebrow={termsPage.eyebrow}
      title={termsPage.title}
      lede={termsPage.lede}
    />
  )
}
