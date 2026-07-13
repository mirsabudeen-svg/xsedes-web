import type { Metadata } from "next"
import AboutContent from "@/components/pages/AboutContent"

export const metadata: Metadata = {
  title: "ABOUT — XSEDES",
  description: "About XSEDES — engineering, doctrine, and team.",
}

export default function AboutPage() {
  return <AboutContent />
}
