"use client"

import { useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import GridField from "@/components/background/GridField"
import ParticleField from "@/components/background/ParticleField"
import BootGate from "@/components/entry/BootGate"
import {
  MissionProvider,
  useMissionProgress,
} from "@/components/providers/MissionProvider"
import { SmoothScroll } from "@/components/providers/SmoothScroll"
import MissionBar from "@/components/telemetry/MissionBar"
import MissionRail from "@/components/telemetry/MissionRail"
import { isChromelessPath } from "@/lib/chromeless"

type MissionShellProps = {
  children: ReactNode
}

const ChromelessGateDismiss = () => {
  const { dismissGate, gateDismissed } = useMissionProgress()
  useEffect(() => {
    if (!gateDismissed) dismissGate()
  }, [dismissGate, gateDismissed])
  return null
}

const MissionChrome = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const chromeless = isChromelessPath(pathname)

  if (chromeless) {
    return (
      <>
        <ChromelessGateDismiss />
        <SmoothScroll>
          <div className="relative z-[1]">{children}</div>
        </SmoothScroll>
      </>
    )
  }

  return (
    <>
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
    </>
  )
}

/** Client shell: mission chrome on main site; minimal shell on venture pages. */
const MissionShell = ({ children }: MissionShellProps) => (
  <MissionProvider>
    <MissionChrome>{children}</MissionChrome>
  </MissionProvider>
)

export default MissionShell
