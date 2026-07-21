"use client"

import { useCallback } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"

type LegalContentProps = {
  sectionId: string
  eyebrow: string
  title: string
  lede: string
}

/** Shared shell for /legal/privacy and /legal/terms â€” both single-section pages. */
const LegalContent = ({ sectionId, eyebrow, title, lede }: LegalContentProps) => {
  const { clearedSections, registerClearable } = useMissionProgress()

  const sectionRef = useCallback(
    (el: HTMLElement | null) => registerClearable(sectionId, el),
    [registerClearable, sectionId],
  )

  return (
    <main id="main-content" tabIndex={-1}>
      <section
        ref={sectionRef}
        id={sectionId}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(sectionId)}>
            {eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="text-[clamp(30px,4.2vw,48px)] font-extrabold uppercase leading-[1.06] tracking-[0.015em]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 max-w-[720px] text-[15px] text-[var(--dim)]">
            {lede}
          </p>
        </Reveal>
      </section>
    </main>
  )
}

export default LegalContent
