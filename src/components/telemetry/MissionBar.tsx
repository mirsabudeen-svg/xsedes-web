"use client"

import { useMissionProgress } from "@/components/providers/MissionProvider"
import { missionStages } from "@/content/divisions"
import { rail } from "@/content/site"

/**
 * Mobile mission telemetry bar (<980px). Replaces the rail; state from
 * MissionContext only.
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
      role="status"
      aria-live="polite"
      aria-label={`Mission progress ${progress}% · ${stageName}`}
      className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--hairline)] bg-black/70 px-[18px] pb-2.5 pt-3 backdrop-blur-[8px] min-[981px]:hidden"
    >
      <div className="flex items-baseline justify-between">
        <div className="text-[12px] font-extrabold uppercase tracking-[0.3em]">
          {rail.brand}
          <span className="text-[var(--accent)]">.</span>
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dim)] tabular-nums">
          {progress}% · {stageName.toUpperCase()}
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
