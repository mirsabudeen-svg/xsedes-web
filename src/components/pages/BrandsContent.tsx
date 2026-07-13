"use client"

import { useCallback } from "react"
import Link from "next/link"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
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
    <main>
      <section
        ref={sectionRef}
        id={SECTION_ID}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(SECTION_ID)}>
            {brandsPageStrings.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
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
              <Link
                key={b.slug}
                href={`/${b.slug}`}
                className="relative block bg-[var(--ink)] px-[26px] pb-[30px] pt-[26px] no-underline transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--glass)]"
              >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]">
                  {brandsPageStrings.patternA}
                </p>
                <h2 className="text-[19px] font-bold uppercase tracking-[0.02em] text-[var(--text)]">
                  {b.label}
                </h2>
                <p className="mt-2 text-[13px] text-[var(--dim)]">
                  {b.tagline}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  )
}

export default BrandsContent
