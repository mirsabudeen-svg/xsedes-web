"use client"

import type { ReactNode } from "react"

type PageEnterProps = {
  children: ReactNode
}

/**
 * Route-segment enter wrapper. Intentionally a no-op passthrough:
 * Mission Reveal + BootGate own enter choreography. A Motion/CSS opacity
 * shell here previously left the whole page stuck at opacity 0.
 */
const PageEnter = ({ children }: PageEnterProps) => <>{children}</>

export default PageEnter
