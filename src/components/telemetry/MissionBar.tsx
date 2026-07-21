"use client"

import Link from "next/link"
import MissionStageSheet from "@/components/telemetry/MissionStageSheet"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { missionStages } from "@/content/divisions"
import { rail, site } from "@/content/site"

/**
 * Mobile mission telemetry bar (<980px). Replaces the rail; includes a
 * Stages sheet that mirrors MissionRail jumps.
 */
const MissionBar = () => {
  const { progress, activeStage } = useMissionProgress()

  const stageName =
    missionStages.find((s) => s.key === activeStage)?.name ??
    missionStages[0]?.name ??
    "Discover"

  return (
    <div
      data-mission-bar=""
      className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--hairline)] bg-black/70 px-[18px] pb-2.5 pt-3 backdrop-blur-[8px] min-[981px]:hidden"
    >
      <div className="flex items-baseline justify-between gap-3">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-[var(--text)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          {rail.brand}
          <span className="text-[var(--accent)]">.</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div
            role="status"
            aria-live="polite"
            aria-label={`Mission progress ${progress}% · ${stageName}`}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dim)] tabular-nums"
          >
            {progress}% · {stageName.toUpperCase()}
          </div>
          <MissionStageSheet />
        </div>
      </div>
      <div className="relative mt-2.5 h-px bg-[var(--hairline)]">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-[width] duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default MissionBar
