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
 * Renders SiteHeader/SiteFooter for multi-page routes. Venture landings
 * stay chromeless. Mission home (`/`) keeps SiteHeader for wayfinding but
 * uses sections/Footer instead of the multi-column SiteFooter.
 */
const SiteChrome = ({ children }: SiteChromeProps) => {
  const pathname = usePathname()
  const chromeless = isChromelessPath(pathname)
  const isMissionHome = pathname === "/"

  if (chromeless) return <>{children}</>

  return (
    <>
      <SiteHeader />
      {children}
      {isMissionHome ? null : <SiteFooter />}
    </>
  )
}

export default SiteChrome
