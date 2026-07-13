import type { Metadata } from "next"
import WorkIndexContent from "@/components/pages/WorkIndexContent"
import { caseStudies } from "@/content/case-studies"

export const metadata: Metadata = {
  title: "WORK — XSEDES",
  description: "Case studies across XSEDES divisions.",
}

export default function WorkPage() {
  const sorted = [...caseStudies].sort(
    (a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf(),
  )
  const industries = Array.from(new Set(sorted.map((c) => c.industry))).sort()

  return <WorkIndexContent caseStudies={sorted} industries={industries} />
}
