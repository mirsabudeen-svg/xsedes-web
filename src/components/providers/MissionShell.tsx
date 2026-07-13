"use client"

import type { ReactNode } from "react"
import GridField from "@/components/background/GridField"
import ParticleField from "@/components/background/ParticleField"
import BootGate from "@/components/entry/BootGate"
import { MissionProvider } from "@/components/providers/MissionProvider"
import { SmoothScroll } from "@/components/providers/SmoothScroll"
import MissionBar from "@/components/telemetry/MissionBar"
import MissionRail from "@/components/telemetry/MissionRail"

type MissionShellProps = {
  children: ReactNode
}

/** Client shell: background + boot gate + telemetry + gated Lenis. */
const MissionShell = ({ children }: MissionShellProps) => (
  <MissionProvider>
    <ParticleField />
    <GridField />
    <BootGate />
    <SmoothScroll>
      <MissionRail />
      <MissionBar />
      <div className="relative z-[1] max-[980px]:pt-[58px] min-[981px]:ml-[var(--rail-w)]">
        {children}
      </div>
    </SmoothScroll>
  </MissionProvider>
)

export default MissionShell
