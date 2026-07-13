"use client"

import { useCallback } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { positioning } from "@/content/site"

const POSITIONING_ID = "s-positioning"

const Positioning = () => {
  const { clearedSections, registerClearable } = useMissionProgress()
  const cleared = clearedSections.has(POSITIONING_ID)

  const sectionRef = useCallback(
    (el: HTMLElement | null) => {
      registerClearable(POSITIONING_ID, el)
    },
    [registerClearable],
  )

  return (
    <section
      ref={sectionRef}
      id={POSITIONING_ID}
      className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
    >
      <CornerMarks />

      <Reveal>
        <SectionLabel cleared={cleared}>{positioning.eyebrow}</SectionLabel>
      </Reveal>

      <Reveal delay={1}>
        <h2 className="text-[clamp(30px,4.2vw,56px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
          {positioning.headlineBefore}
          <span className="text-[var(--accent)]">
            {positioning.headlineAccent}
          </span>
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <p className="mt-7 max-w-[620px] text-[clamp(16px,1.35vw,19px)] font-normal text-[var(--dim)]">
          {positioning.lede}
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-14 grid max-w-[860px] grid-cols-1 gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2">
          <div className="bg-[var(--ink)] px-[30px] pb-[34px] pt-[30px]">
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
              {positioning.weAreLabel}
            </h3>
            <ul className="list-none">
              {positioning.weAre.map((item, i) => (
                <li
                  key={item}
                  className={`py-2.5 text-[15px] text-[var(--dim)] ${
                    i === 0 ? "" : "border-t border-[var(--hairline)]"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[var(--ink)] px-[30px] pb-[34px] pt-[30px]">
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--faint)]">
              {positioning.weAreNotLabel}
            </h3>
            <ul className="list-none">
              {positioning.weAreNot.map((item, i) => (
                <li
                  key={item}
                  className={`py-2.5 text-[15px] text-[var(--faint)] line-through decoration-white/25 ${
                    i === 0 ? "" : "border-t border-[var(--hairline)]"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default Positioning
