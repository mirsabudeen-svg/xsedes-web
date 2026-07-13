import type { Metadata } from "next"
import LegalContent from "@/components/pages/LegalContent"
import { privacyPage } from "@/content/legal"

export const metadata: Metadata = {
  title: "PRIVACY POLICY — XSEDES",
  description: "XSEDES privacy policy.",
}

export default function PrivacyPage() {
  return (
    <LegalContent
      sectionId="s-legal-privacy"
      eyebrow={privacyPage.eyebrow}
      title={privacyPage.title}
      lede={privacyPage.lede}
    />
  )
}
