import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Instrument_Serif } from "next/font/google"
import XsmithsFooter from "@/components/xsmiths/XsmithsFooter"
import XsmithsNav from "@/components/xsmiths/XsmithsNav"
import SkipLink from "@/components/ui/SkipLink"
import { xsmithsSite, xsmithsUrl } from "@/content/xsmiths"
import "@/styles/xsmiths-tokens.css"

const accentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-xsmiths-accent",
})

const defaultTitle = `${xsmithsSite.name} — ${xsmithsSite.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(xsmithsSite.siteOrigin),
  title: {
    default: defaultTitle,
    template: `%s — ${xsmithsSite.name}`,
  },
  description: xsmithsSite.pitch,
  alternates: {
    canonical: xsmithsUrl(),
  },
  openGraph: {
    title: defaultTitle,
    description: xsmithsSite.pitch,
    url: xsmithsUrl(),
    siteName: xsmithsSite.name,
    images: [{ url: "/xsmiths/og-dark.png", width: 1200, height: 630, alt: xsmithsSite.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: xsmithsSite.pitch,
    images: ["/xsmiths/og-dark.png"],
  },
}

/** Knowledge-graph entity (IA §16.1): XSMITHS, venture of XSEDES. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: xsmithsSite.name,
  slogan: xsmithsSite.tagline,
  description: xsmithsSite.pitch,
  url: xsmithsUrl(),
  parentOrganization: {
    "@type": "Organization",
    name: xsmithsSite.parentName,
    url: xsmithsSite.parentHref,
  },
}

export default function XsmithsLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div
      data-brand="xsmiths"
      className={`${accentSerif.variable} min-h-screen bg-[var(--ink)] text-[var(--text)]`}
    >
      <SkipLink />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <XsmithsNav />
      {children}
      <XsmithsFooter />
    </div>
  )
}
