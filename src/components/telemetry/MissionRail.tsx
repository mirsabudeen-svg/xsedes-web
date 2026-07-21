"use client"

import type { KeyboardEvent } from "react"
import Link from "next/link"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { useSmoothScroll } from "@/components/providers/SmoothScroll"
import { missionStages, type StageKey } from "@/content/divisions"
import { rail, site } from "@/content/site"

const getStateLabel = (
  key: StageKey,
  index: number,
  cleared: ReadonlySet<StageKey>,
): string => {
  if (cleared.has(key)) return rail.stateCleared

  const stage = missionStages[index]
  if (!stage) return rail.stateLocked

  if (index > 0) {
    const prev = missionStages[index - 1]
    if (prev && cleared.has(prev.key) && !cleared.has(key)) {
      return rail.stateUnlocked
    }
  }

  return stage.idleState
}

const getSystemStatus = (
  progress: number,
  complete: boolean,
  gateDismissed: boolean,
): string => {
  if (complete || progress >= 100) return rail.statusOperational
  if (progress > 0) return rail.statusTracking
  if (!gateDismissed) return rail.statusInitialising
  return rail.statusStandby
}

/**
 * Desktop mission telemetry rail (≥980px). State from MissionContext only —
 * stage nodes stay idle until sections register in later phases.
 */
const MissionRail = () => {
  const {
    progress,
    activeStage,
    clearedStages,
    complete,
    gateDismissed,
    reducedMotion,
  } = useMissionProgress()
  const { scrollTo } = useSmoothScroll()

  const handleNavigate = (sectionId: string) => {
    scrollTo(`#${sectionId}`, { immediate: reducedMotion })
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLLIElement>,
    sectionId: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleNavigate(sectionId)
    }
  }

  const status = getSystemStatus(progress, complete, gateDismissed)

  return (
    <aside
      data-mission-rail=""
      aria-label="Scroll progress"
      className="fixed bottom-0 left-0 top-0 z-50 hidden w-[var(--rail-w)] flex-col border-r border-[var(--hairline)] bg-black/55 px-[22px] py-7 backdrop-blur-[8px] min-[981px]:flex"
    >
      <Link
        href="/"
        aria-label={`${site.name} home`}
        className="text-[15px] font-extrabold uppercase tracking-[0.32em] text-[var(--text)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        {rail.brand}
        <span className="text-[var(--accent)]">.</span>
      </Link>
      <div className="mt-1.5 text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--faint)]">
        {rail.sub}
      </div>

      <div className="mt-[34px] border-y border-[var(--hairline)] py-3.5">
        <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
          {rail.progressLabel}
        </div>
        <div className="mt-1 text-[44px] font-light leading-[1.05] text-[var(--text)] tabular-nums">
          {progress}
          <span className="text-[22px] font-light text-[var(--accent)]">%</span>
        </div>
      </div>

      <ol className="mt-[30px] flex-1 list-none">
        {missionStages.map((stage, index) => {
          const isCleared = clearedStages.has(stage.key)
          const isActive = activeStage === stage.key
          const stateLabel = getStateLabel(stage.key, index, clearedStages)

          return (
            <li
              key={stage.key}
              role="link"
              tabIndex={0}
              aria-label={`Go to ${stage.name}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => handleNavigate(stage.sectionId)}
              onKeyDown={(e) => handleKeyDown(e, stage.sectionId)}
              className={`relative cursor-pointer pb-[26px] pl-6 outline-none last:pb-0 last:before:hidden before:absolute before:bottom-[-2px] before:left-[5px] before:top-[14px] before:w-px before:bg-[var(--hairline)] before:content-[''] focus-visible:[&_.mission-node]:border-[var(--accent)] ${
                isActive ? "mission-stage-active" : ""
              } ${isCleared ? "mission-stage-cleared" : ""}`}
            >
              <span
                className={`mission-node absolute left-0 top-1 h-[11px] w-[11px] rounded-full border bg-[var(--ink)] transition-[border-color,box-shadow,background] duration-[600ms] ease-[var(--ease)] ${
                  isCleared
                    ? "border-[var(--accent)] bg-[var(--accent)]"
                    : isActive
                      ? "border-[var(--accent)] shadow-[0_0_0_3px_rgba(78,242,211,0.12)]"
                      : "border-[var(--hairline-strong)]"
                }`}
              />
              <div
                className={`text-[10.5px] font-semibold uppercase tracking-[0.2em] transition-colors duration-[600ms] ease-[var(--ease)] group-hover:text-[var(--text)] ${
                  isCleared
                    ? "text-[var(--accent)]"
                    : isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--faint)] hover:text-[var(--text)]"
                }`}
              >
                {stage.name}
              </div>
              <div
                className={`mt-0.5 text-[8.5px] font-medium uppercase tracking-[0.18em] transition-colors duration-[600ms] ease-[var(--ease)] ${
                  isCleared
                    ? "text-[var(--accent)] opacity-90"
                    : "text-[var(--faint)] opacity-70"
                }`}
              >
                {stateLabel}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="border-t border-[var(--hairline)] pt-3.5 text-[8.5px] font-medium uppercase leading-[1.9] tracking-[0.2em] text-[var(--faint)]">
        {rail.systemPrefix}
        <span
          className={`transition-colors duration-[600ms] ease-[var(--ease)] ${
            complete ? "text-[var(--accent)]" : "text-[var(--dim)]"
          }`}
        >
          {status}
        </span>
        <br />
        {site.basedInShort}
      </div>
    </aside>
  )
}

export default MissionRail
