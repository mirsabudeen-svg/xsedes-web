import type { Metadata } from "next"
import HomePage from "@/components/xsmiths/HomePage"
import { xsmithsUrl } from "@/content/xsmiths/site"

export const metadata: Metadata = {
  alternates: { canonical: xsmithsUrl() },
  openGraph: { url: xsmithsUrl() },
  twitter: { card: "summary_large_image" },
}

export default function XsmithsHomePage() {
  return <HomePage />
}
