import type { Metadata } from "next"
import { notFound } from "next/navigation"
import VenturePageContent from "@/components/pages/VenturePageContent"
import { getVenturePage } from "@/content/venture-pages"

export const metadata: Metadata = {
  title: "Bobb's Kitchen — XSEDES",
  description: "Bobb's Kitchen — a venture incubated inside XSEDES.",
}

export default function BobbsKitchenPage() {
  const venture = getVenturePage("bobbs-kitchen")
  if (!venture) notFound()
  return <VenturePageContent venture={venture} />
}
