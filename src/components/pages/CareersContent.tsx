"use client"

import { useCallback } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { careersHero, careersRoles } from "@/content/careers"

const HERO_ID = "s-careers-hero"
const ROLES_ID = "s-careers-roles"

const CareersContent = () => {
  const { clearedSections, registerClearable } = useMissionProgress()

  const heroRef = useCallback(
    (el: HTMLElement | null) => registerClearable(HERO_ID, el),
    [registerClearable],
  )
  const rolesRef = useCallback(
    (el: HTMLElement | null) => registerClearable(ROLES_ID, el),
    [registerClearable],
  )

  return (
    <main>
      <section
        ref={heroRef}
        id={HERO_ID}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(HERO_ID)}>
            {careersHero.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="text-[clamp(34px,4.8vw,64px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {careersHero.title}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 max-w-[620px] text-[clamp(16px,1.35vw,19px)] font-normal text-[var(--dim)]">
            {careersHero.lede}
          </p>
        </Reveal>
      </section>

      <section
        ref={rolesRef}
        id={ROLES_ID}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(ROLES_ID)}>
            {careersRoles.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <p className="text-[15px] text-[var(--faint)]">
            {careersRoles.empty}
          </p>
        </Reveal>
      </section>
    </main>
  )
}

export default CareersContent
