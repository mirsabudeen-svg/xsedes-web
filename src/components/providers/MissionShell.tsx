"use client"

import type { ReactNode } from "react"
import BootGate from "@/components/entry/BootGate"
import { MissionProvider } from "@/components/providers/MissionProvider"
import { SmoothScroll } from "@/components/providers/SmoothScroll"

type MissionShellProps = {
  children: ReactNode
}

/** Client shell: boot gate + mission progress + gated Lenis. */
const MissionShell = ({ children }: MissionShellProps) => (
  <MissionProvider>
    <BootGate />
    <SmoothScroll>{children}</SmoothScroll>
  </MissionProvider>
)

export default MissionShell
