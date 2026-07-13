import type { Metadata } from "next"
import { notFound } from "next/navigation"
import VenturePageContent from "@/components/pages/VenturePageContent"
import { getVenturePage } from "@/content/venture-pages"

export const metadata: Metadata = {
  title: "KONSTRUKT — XSEDES",
  description: "KONSTRUKT — a venture incubated inside XSEDES.",
}

export default function KonstruktPage() {
  const venture = getVenturePage("konstrukt")
  if (!venture) notFound()
  return <VenturePageContent venture={venture} />
}
