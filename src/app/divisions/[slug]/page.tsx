import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DivisionPageContent from "@/components/pages/DivisionPageContent"
import { caseStudies } from "@/content/case-studies"
import { divisionPages } from "@/content/division-pages"
import { divisions, type DivisionId } from "@/content/divisions"

type DivisionPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return divisions.map((d) => ({ slug: d.id }))
}

const findDivision = (slug: string) => divisions.find((d) => d.id === slug)

export async function generateMetadata({
  params,
}: DivisionPageProps): Promise<Metadata> {
  const { slug } = await params
  const division = findDivision(slug)
  if (!division) return {}
  return {
    title: `${division.name.toUpperCase()} — XSEDES`,
    description: `${division.name} — ${division.outcome}`,
  }
}

export default async function DivisionPage({ params }: DivisionPageProps) {
  const { slug } = await params
  const division = findDivision(slug)
  if (!division) notFound()

  const copy = divisionPages.find((p) => p.id === division.id)!
  const index = divisions.findIndex((d) => d.id === division.id)
  const label = `§ ${String(index + 1).padStart(2, "0")} · ${division.name.toUpperCase()}`
  const proofPieces = caseStudies
    .filter((c) => c.division === (division.id as DivisionId))
    .slice(0, 3)

  return (
    <DivisionPageContent
      division={division}
      copy={copy}
      label={label}
      proofPieces={proofPieces}
    />
  )
}
