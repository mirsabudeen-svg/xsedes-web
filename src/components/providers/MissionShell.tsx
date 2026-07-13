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
import { isChromelessPath, isMissionHomePath } from "@/lib/chromeless"

type MissionShellProps = {
  children: ReactNode
}

/** Ensures reveals/Lenis can arm on non-mission routes that skip BootGate. */
const SilentGateDismiss = () => {
  const { armReveals, gateDismissed } = useMissionProgress()
  useEffect(() => {
    if (!gateDismissed) armReveals()
  }, [armReveals, gateDismissed])
  return null
}

/** If the session has not seen the boot, keep gate pending when entering `/`. */
const MissionHomeBootstrap = () => {
  const { prepareBootGate } = useMissionProgress()
  useEffect(() => {
    prepareBootGate()
  }, [prepareBootGate])
  return null
}

const MissionChrome = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const chromeless = isChromelessPath(pathname)
  const missionHome = isMissionHomePath(pathname)

  if (chromeless || !missionHome) {
    return (
      <>
        <SilentGateDismiss />
        <SmoothScroll>
          <div className="relative z-[1]">{children}</div>
        </SmoothScroll>
      </>
    )
  }

  return (
    <>
      <MissionHomeBootstrap />
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

/** Client shell: full mission chrome on `/` only; minimal shell elsewhere. */
const MissionShell = ({ children }: MissionShellProps) => (
  <MissionProvider>
    <MissionChrome>{children}</MissionChrome>
  </MissionProvider>
)

export default MissionShell
