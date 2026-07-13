"use client"

import { useCallback } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionEnter from "@/components/motion/SectionEnter"
import SectionLabel from "@/components/ui/SectionLabel"
import VentureCard from "@/components/ui/VentureCard"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { venturesSection } from "@/content/site"
import { ventures } from "@/content/ventures"

const VENTURES_ID = "s-ventures"

const Ventures = () => {
  const { clearedSections, registerClearable } = useMissionProgress()
  const cleared = clearedSections.has(VENTURES_ID)

  const sectionRef = useCallback(
    (el: HTMLElement | null) => {
      registerClearable(VENTURES_ID, el)
    },
    [registerClearable],
  )

  return (
    <section
      ref={sectionRef}
      id={VENTURES_ID}
      className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
    >
      <CornerMarks />

      <SectionEnter>
        <SectionLabel cleared={cleared}>{venturesSection.eyebrow}</SectionLabel>
      </SectionEnter>

      <Reveal delay={1} wipe>
        <h2 className="text-[clamp(30px,4.2vw,56px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
          {venturesSection.headlineBefore}
          <span className="text-[var(--accent)]">
            {venturesSection.headlineAccent}
          </span>
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <p className="mt-7 max-w-[620px] text-[clamp(16px,1.35vw,19px)] font-normal text-[var(--dim)]">
          {venturesSection.lede}
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border border-[var(--hairline)] bg-[var(--hairline)]">
          {ventures.map((venture) => (
            <VentureCard
              key={venture.id}
              href={`/${venture.id}`}
              id={venture.id}
              name={venture.name}
              eyebrow={venture.industry}
              description={venture.oneLiner}
              headingLevel="h3"
            />
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default Ventures
