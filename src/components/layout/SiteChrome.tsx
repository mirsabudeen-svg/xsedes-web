"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import SiteCardNav from "@/components/layout/SiteCardNav"
import SiteFooter from "@/components/layout/SiteFooter"
import SiteLogo from "@/components/layout/SiteLogo"
import { isChromelessPath, isMissionHomePath } from "@/lib/chromeless"

type SiteChromeProps = {
  children: ReactNode
}

/**
 * Non-chromeless routes get hamburger CardNav popup (no sticky header).
 * Multipage routes also get SiteFooter.
 * Venture landings stay fully chromeless.
 */
const SiteChrome = ({ children }: SiteChromeProps) => {
  const pathname = usePathname()

  if (isChromelessPath(pathname)) {
    return <>{children}</>
  }

  if (isMissionHomePath(pathname)) {
    return (
      <>
        <SiteCardNav className="card-nav--mission" />
        {children}
      </>
    )
  }

  return (
    <>
      <SiteLogo />
      <SiteCardNav />
      {children}
      <SiteFooter />
    </>
  )
}

export default SiteChrome
