import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CaseStudyContent from "@/components/pages/CaseStudyContent"
import { caseStudies } from "@/content/case-studies"
import { divisions } from "@/content/divisions"

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

const findEntry = (slug: string) => caseStudies.find((c) => c.slug === slug)

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = findEntry(slug)
  if (!entry) return {}
  return {
    title: `${entry.title.toUpperCase()} — XSEDES`,
    description: entry.summary,
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const entry = findEntry(slug)
  if (!entry) notFound()

  const divisionLabel =
    divisions.find((d) => d.id === entry.division)?.name ?? entry.division

  return <CaseStudyContent entry={entry} divisionLabel={divisionLabel} />
}
