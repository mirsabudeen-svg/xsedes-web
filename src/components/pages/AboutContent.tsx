"use client"

import { useCallback } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { aboutCta, aboutDoctrine, aboutHero, aboutTeam } from "@/content/about"

const HERO_ID = "s-about-hero"
const DOCTRINE_ID = "s-about-doctrine"
const TEAM_ID = "s-about-team"

const AboutContent = () => {
  const { clearedSections, registerClearable } = useMissionProgress()

  const heroRef = useCallback(
    (el: HTMLElement | null) => registerClearable(HERO_ID, el),
    [registerClearable],
  )
  const doctrineRef = useCallback(
    (el: HTMLElement | null) => registerClearable(DOCTRINE_ID, el),
    [registerClearable],
  )
  const teamRef = useCallback(
    (el: HTMLElement | null) => registerClearable(TEAM_ID, el),
    [registerClearable],
  )

  return (
    <main id="main-content" tabIndex={-1}>
      <section
        ref={heroRef}
        id={HERO_ID}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(HERO_ID)}>
            {aboutHero.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="text-[clamp(34px,4.8vw,64px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {aboutHero.title}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 max-w-[720px] text-[clamp(16px,1.35vw,19px)] font-normal text-[var(--dim)]">
            {aboutHero.lede}
          </p>
        </Reveal>
      </section>

      <section
        ref={doctrineRef}
        id={DOCTRINE_ID}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(DOCTRINE_ID)}>
            {aboutDoctrine.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold uppercase leading-[1.08] tracking-[0.015em]">
            {aboutDoctrine.title}
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-12 grid grid-cols-1 gap-px border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-3">
            {aboutDoctrine.points.map((point) => (
              <div
                key={point.title}
                className="bg-[var(--ink)] px-[26px] pb-[30px] pt-[26px]"
              >
                <h3 className="mb-3 text-[15px] font-bold uppercase tracking-[0.02em] text-[var(--text)]">
                  {point.title}
                </h3>
                <p className="text-[14px] text-[var(--dim)]">{point.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        ref={teamRef}
        id={TEAM_ID}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px] text-center"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel
            cleared={clearedSections.has(TEAM_ID)}
            className="justify-center"
          >
            {aboutTeam.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <p className="mx-auto max-w-[560px] text-[15px] text-[var(--dim)]">
            {aboutTeam.body}
          </p>
        </Reveal>
        <Reveal delay={2}>
          <a
            href={aboutCta.href}
            className="mt-10 inline-flex items-center gap-3 bg-[var(--accent)] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink)] no-underline transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(78,242,211,0.22)]"
          >
            {aboutCta.label}
          </a>
        </Reveal>
      </section>
    </main>
  )
}

export default AboutContent
