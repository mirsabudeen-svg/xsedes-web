"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import SiteFooter from "@/components/layout/SiteFooter"
import SiteHeader from "@/components/layout/SiteHeader"
import { isChromelessPath, isMissionHomePath } from "@/lib/chromeless"

type SiteChromeProps = {
  children: ReactNode
}

/**
 * Multi-page routes get SiteHeader + SiteFooter.
 * Mission home (`/`) is headerless — MissionRail + sections/Footer own chrome.
 * Venture landings stay fully chromeless.
 */
const SiteChrome = ({ children }: SiteChromeProps) => {
  const pathname = usePathname()

  if (isChromelessPath(pathname) || isMissionHomePath(pathname)) {
    return <>{children}</>
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}

export default SiteChrome
