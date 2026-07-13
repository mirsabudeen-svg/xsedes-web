import type { Metadata } from "next"
import { notFound } from "next/navigation"
import VenturePageContent from "@/components/pages/VenturePageContent"
import { getVenturePage } from "@/content/venture-pages"

export const metadata: Metadata = {
  title: "PhotoShap — XSEDES",
  description: "PhotoShap — a venture incubated inside XSEDES.",
}

export default function PhotoShapPage() {
  const venture = getVenturePage("photoshap")
  if (!venture) notFound()
  return <VenturePageContent venture={venture} />
}
