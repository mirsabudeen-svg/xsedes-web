"use client"

import { useCallback } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionEnter from "@/components/motion/SectionEnter"
import SectionBackdrop from "@/components/ui/SectionBackdrop"
import SectionLabel from "@/components/ui/SectionLabel"
import MagicBento from "@/components/ui/MagicBento"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { venturesSection } from "@/content/site"
import { ventures } from "@/content/ventures"

const VENTURES_ID = "s-ventures"

const Ventures = () => {
  const { clearedSections, registerClearable, reducedMotion } =
    useMissionProgress()
  const cleared = clearedSections.has(VENTURES_ID)

  const sectionRef = useCallback(
    (el: HTMLElement | null) => {
      registerClearable(VENTURES_ID, el)
    },
    [registerClearable],
  )

  const bentoItems = ventures.map((venture) => ({
    id: venture.id,
    title: venture.name,
    description: venture.oneLiner,
    label: venture.industry,
    href: `/${venture.id}`,
    color: "#000000",
  }))

  return (
    <section
      ref={sectionRef}
      id={VENTURES_ID}
      className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
    >
      <SectionBackdrop mark="06" />
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
        <div className="mt-14">
          <MagicBento
            items={bentoItems}
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt={false}
            enableMagnetism
            clickEffect
            spotlightRadius={280}
            particleCount={10}
            glowColor="78, 242, 211"
            disableAnimations={reducedMotion}
          />
        </div>
      </Reveal>
    </section>
  )
}

export default Ventures
