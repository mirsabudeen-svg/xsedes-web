"use client"

import { useCallback } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { useRegisterStage } from "@/hooks/useRegisterStage"
import {
  stageTagDone,
  stageTagIdle,
  type Division,
} from "@/content/divisions"

type StageSectionProps = {
  division: Division
}

/**
 * Single operating-model stage — data-driven from divisions.ts.
 * Registers as a mission stage (rail) and as clearable (eyebrow tick).
 */
const StageSection = ({ division }: StageSectionProps) => {
  const registerStage = useRegisterStage(division.stageKey)
  const { clearedStages, clearedSections, registerClearable } =
    useMissionProgress()

  const stageCleared = clearedStages.has(division.stageKey)
  const sectionCleared = clearedSections.has(division.sectionId)

  const sectionRef = useCallback(
    (el: HTMLElement | null) => {
      registerStage(el)
      registerClearable(division.sectionId, el)
    },
    [registerStage, registerClearable, division.sectionId],
  )

  const tag = stageCleared
    ? stageTagDone(division.stageIndex)
    : stageTagIdle(division.stageIndex)

  return (
    <section
      ref={sectionRef}
      id={division.sectionId}
      className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
    >
      <CornerMarks />

      <Reveal wipe>
        <SectionLabel cleared={sectionCleared}>
          {division.eyebrow}
        </SectionLabel>
      </Reveal>

      <Reveal delay={1} wipe>
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="text-[clamp(30px,4.2vw,56px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {division.name}
          </h2>
          <div
            className={`whitespace-nowrap border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-[color,border-color] duration-[600ms] ease-[var(--ease)] ${
              stageCleared
                ? "border-[rgba(78,242,211,0.45)] text-[var(--accent)]"
                : "border-[var(--hairline-strong)] text-[var(--faint)]"
            }`}
          >
            {tag}
          </div>
        </div>
      </Reveal>

      <Reveal delay={2}>
        <ul className="mt-12 max-w-[820px] list-none border-t border-[var(--hairline)]">
          {division.functions.map((fn, i) => (
            <li
              key={fn}
              className="flex items-baseline gap-[22px] border-b border-[var(--hairline)] py-[15px] text-[15.5px] text-[var(--dim)] transition-[color,padding-left,border-color] duration-[400ms] ease-[var(--ease)] [@media(hover:hover)]:hover:border-[rgba(78,242,211,0.35)] [@media(hover:hover)]:hover:pl-2.5 [@media(hover:hover)]:hover:text-[var(--text)] [@media(hover:hover)]:hover:[&_.fn-idx]:text-[var(--accent)]"
            >
              <span className="fn-idx w-[34px] shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--faint)] tabular-nums transition-colors duration-[400ms] ease-[var(--ease)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{fn}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={3}>
        <p className="mt-[52px] text-[clamp(24px,2.6vw,34px)] font-normal leading-[1.3] text-[var(--accent)]">
          <span className="font-light text-[var(--accent)]">→ </span>
          {division.outcome}
        </p>
      </Reveal>
    </section>
  )
}

export default StageSection
