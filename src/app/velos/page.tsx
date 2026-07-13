import type { Metadata } from "next"
import { notFound } from "next/navigation"
import VenturePageContent from "@/components/pages/VenturePageContent"
import { getVenturePage } from "@/content/venture-pages"

export const metadata: Metadata = {
  title: "VELOS — XSEDES",
  description: "VELOS — a venture incubated inside XSEDES.",
}

export default function VelosPage() {
  const venture = getVenturePage("velos")
  if (!venture) notFound()
  return <VenturePageContent venture={venture} />
}
