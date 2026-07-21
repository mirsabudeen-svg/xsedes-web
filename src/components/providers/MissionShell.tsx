"use client"

import { useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import GridField from "@/components/background/GridField"
import AtmosphereField from "@/components/background/AtmosphereField"
import ParticleField from "@/components/background/ParticleField"
import BootGate from "@/components/entry/BootGate"
import {
  MissionProvider,
  useMissionProgress,
} from "@/components/providers/MissionProvider"
import { SmoothScroll } from "@/components/providers/SmoothScroll"
import MissionBar from "@/components/telemetry/MissionBar"
import MissionRail from "@/components/telemetry/MissionRail"
import { bootGate } from "@/content/site"
import {
  isChromelessPath,
  isMissionHomePath,
  isXsmithsPath,
} from "@/lib/chromeless"

const readBootSeen = (): boolean => {
  try {
    return sessionStorage.getItem(bootGate.sessionKey) === "1"
  } catch {
    return false
  }
}

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

/**
 * Mission home gate bootstrap:
 * - Boot already seen → arm reveals/Lenis immediately (BootGate will not mount).
 * - First visit → keep gate pending until BootGate dismisses.
 */
const MissionHomeBootstrap = () => {
  const { prepareBootGate, armReveals } = useMissionProgress()
  useEffect(() => {
    if (readBootSeen()) {
      armReveals()
      return
    }
    prepareBootGate()
  }, [prepareBootGate, armReveals])
  return null
}

const MissionChrome = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const chromeless = isChromelessPath(pathname)
  const missionHome = isMissionHomePath(pathname)
  // XSMITHS shell isolation: no parent atmosphere/grid, native scroll only
  // (Design System §8.2; Frontend Architecture Appendix B §3).
  const xsmiths = isXsmithsPath(pathname)

  if (xsmiths) {
    return (
      <>
        <SilentGateDismiss />
        <SmoothScroll disabled>
          <div className="relative z-[1]">{children}</div>
        </SmoothScroll>
      </>
    )
  }

  if (chromeless || !missionHome) {
    return (
      <>
        <SilentGateDismiss />
        <AtmosphereField />
        <GridField />
        <SmoothScroll>
          <div className="relative z-[1]">{children}</div>
        </SmoothScroll>
      </>
    )
  }

  return (
    <>
      <MissionHomeBootstrap />
      <AtmosphereField />
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
