"use client"

import type { ReactNode } from "react"
import { MissionProvider } from "@/components/providers/MissionProvider"
import { SmoothScroll } from "@/components/providers/SmoothScroll"

type MissionShellProps = {
  children: ReactNode
}

/** Client shell: mission progress context + gated Lenis. */
const MissionShell = ({ children }: MissionShellProps) => (
  <MissionProvider>
    <SmoothScroll>{children}</SmoothScroll>
  </MissionProvider>
)

export default MissionShell
