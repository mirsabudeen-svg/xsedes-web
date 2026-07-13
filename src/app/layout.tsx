import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import ConciergeWidget from "@/components/agent/ConciergeWidget"
import SiteChrome from "@/components/layout/SiteChrome"
import MissionShell from "@/components/providers/MissionShell"
import "./globals.css"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-barlow",
})

export const metadata: Metadata = {
  title: "XSEDES — Engineering Extraordinary Event Experiences",
  description:
    "XSEDES is an Experiential Technology Partner for the events, exhibitions, entertainment and live experiences industry.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={barlow.variable}>
      <body
        className={`${barlow.className} bg-[var(--ink)] text-[var(--text)] antialiased`}
      >
        <MissionShell>
          <SiteChrome>{children}</SiteChrome>
          <ConciergeWidget />
        </MissionShell>
      </body>
    </html>
  )
}
