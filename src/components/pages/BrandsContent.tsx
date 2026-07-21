"use client"

import { useCallback } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import VentureCard from "@/components/ui/VentureCard"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { brandDirectory, brandsPageStrings } from "@/content/brand-directory"

const SECTION_ID = "s-brands"

const BrandsContent = () => {
  const { clearedSections, registerClearable } = useMissionProgress()

  const sectionRef = useCallback(
    (el: HTMLElement | null) => registerClearable(SECTION_ID, el),
    [registerClearable],
  )

  return (
    <main id="main-content" tabIndex={-1}>
      <section
        ref={sectionRef}
        id={SECTION_ID}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal wipe>
          <SectionLabel cleared={clearedSections.has(SECTION_ID)}>
            {brandsPageStrings.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1} wipe>
          <h1 className="text-[clamp(34px,4.8vw,64px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {brandsPageStrings.title}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 max-w-[620px] text-[15px] text-[var(--dim)]">
            {brandsPageStrings.intro}
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-14 grid grid-cols-1 gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
            {brandDirectory.map((b) => (
              <VentureCard
                key={b.slug}
                href={`/${b.slug}`}
                id={b.slug}
                name={b.label}
                eyebrow={brandsPageStrings.patternA}
                description={b.tagline}
                headingLevel="h2"
              />
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  )
}

export default BrandsContent
