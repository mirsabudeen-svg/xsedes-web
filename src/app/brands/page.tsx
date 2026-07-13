import type { Metadata } from "next"
import BrandsContent from "@/components/pages/BrandsContent"

export const metadata: Metadata = {
  title: "BRANDS — XSEDES",
  description: "Product brands under XSEDES.",
}

export default function BrandsPage() {
  return <BrandsContent />
}
