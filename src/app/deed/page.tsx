import type { Metadata } from "next"
import { notFound } from "next/navigation"
import VenturePageContent from "@/components/pages/VenturePageContent"
import { getVenturePage } from "@/content/venture-pages"

export const metadata: Metadata = {
  title: "DEED — XSEDES",
  description: "DEED — a venture incubated inside XSEDES.",
}

export default function DeedPage() {
  const venture = getVenturePage("deed")
  if (!venture) notFound()
  return <VenturePageContent venture={venture} />
}
