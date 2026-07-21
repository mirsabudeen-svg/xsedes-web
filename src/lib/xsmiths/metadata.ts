import type { Metadata } from "next"
import { xsmithsSite, xsmithsUrl } from "@/content/xsmiths/site"

const ogImage = {
  url: "/xsmiths/og-dark.png",
  width: 1200,
  height: 630,
  alt: xsmithsSite.name,
} as const

/** Per-page metadata with matching Open Graph / Twitter cards (IA §16). */
export const xsmithsPageMetadata = (
  title: string,
  description: string,
  path: string,
): Metadata => {
  const pageTitle = `${title} — ${xsmithsSite.name}`
  const url = xsmithsUrl(path)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: xsmithsSite.name,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage.url],
    },
  }
}
