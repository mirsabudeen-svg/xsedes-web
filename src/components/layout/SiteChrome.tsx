"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import SiteFooter from "@/components/layout/SiteFooter"
import SiteHeader from "@/components/layout/SiteHeader"
import { isChromelessPath } from "@/lib/chromeless"

type SiteChromeProps = {
  children: ReactNode
}

/**
 * Renders SiteHeader/SiteFooter for normal pages. Venture landings
 * (photoshap, velos, konstrukt, bobbs-kitchen, deed) stay chromeless —
 * only the in-page "← XSEDES" back link from VenturePageContent.
 */
const SiteChrome = ({ children }: SiteChromeProps) => {
  const pathname = usePathname()
  const chromeless = isChromelessPath(pathname)

  if (chromeless) return <>{children}</>

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}

export default SiteChrome
