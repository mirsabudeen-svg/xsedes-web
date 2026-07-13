"use client"

import type { ReactNode } from "react"
import GridField from "@/components/background/GridField"
import ParticleField from "@/components/background/ParticleField"
import BootGate from "@/components/entry/BootGate"
import { MissionProvider } from "@/components/providers/MissionProvider"
import { SmoothScroll } from "@/components/providers/SmoothScroll"

type MissionShellProps = {
  children: ReactNode
}

/** Client shell: background field + boot gate + mission progress + gated Lenis. */
const MissionShell = ({ children }: MissionShellProps) => (
  <MissionProvider>
    <ParticleField />
    <GridField />
    <BootGate />
    <SmoothScroll>
      <div className="relative z-[1]">{children}</div>
    </SmoothScroll>
  </MissionProvider>
)

export default MissionShell
