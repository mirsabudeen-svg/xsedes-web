"use client"

import { useCallback } from "react"
import Link from "next/link"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import type { Division } from "@/content/divisions"
import { divisionPageStrings, type DivisionPageCopy } from "@/content/division-pages"
import type { CaseStudy } from "@/content/case-studies"

type DivisionPageContentProps = {
  division: Division
  copy: DivisionPageCopy
  label: string
  proofPieces: readonly CaseStudy[]
}

/**
 * /divisions/[slug] detail page — ported from
 * website/src/pages/divisions/[slug].astro. Four sections: hero,
 * capabilities, proof (case studies for this division), process.
 */
const DivisionPageContent = ({
  division,
  copy,
  label,
  proofPieces,
}: DivisionPageContentProps) => {
  const heroId = `s-division-${division.id}-hero`
  const capabilitiesId = `s-division-${division.id}-capabilities`
  const proofId = `s-division-${division.id}-proof`
  const processId = `s-division-${division.id}-process`

  const { clearedSections, registerClearable } = useMissionProgress()

  const heroRef = useCallback(
    (el: HTMLElement | null) => registerClearable(heroId, el),
    [registerClearable, heroId],
  )
  const capabilitiesRef = useCallback(
    (el: HTMLElement | null) => registerClearable(capabilitiesId, el),
    [registerClearable, capabilitiesId],
  )
  const proofRef = useCallback(
    (el: HTMLElement | null) => registerClearable(proofId, el),
    [registerClearable, proofId],
  )
  const processRef = useCallback(
    (el: HTMLElement | null) => registerClearable(processId, el),
    [registerClearable, processId],
  )

  return (
    <main>
      <section
        ref={heroRef}
        id={heroId}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(heroId)}>
            {label}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="text-[clamp(34px,4.8vw,64px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {division.name}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 max-w-[40ch] text-[clamp(22px,2.4vw,32px)] font-normal leading-[1.3] text-[var(--text)]">
            {division.outcome}
          </p>
        </Reveal>
      </section>

      <section
        ref={capabilitiesRef}
        id={capabilitiesId}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(capabilitiesId)}>
            {divisionPageStrings.capabilitiesEyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {copy.capabilities.map((cap) => (
              <li
                key={cap}
                className="border border-[var(--hairline)] px-6 py-5 text-[14px] text-[var(--dim)]"
              >
                {cap}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section
        ref={proofRef}
        id={proofId}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(proofId)}>
            {divisionPageStrings.proofEyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          {proofPieces.length === 0 ? (
            <p className="text-[14px] text-[var(--faint)]">
              {divisionPageStrings.proofEmpty}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-px border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-3">
              {proofPieces.map((c) => (
                <Link
                  key={c.slug}
                  href={`/work/${c.slug}`}
                  className="block bg-[var(--ink)] px-6 pb-7 pt-6 no-underline transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--glass)]"
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                    {c.industry}
                  </p>
                  <h3 className="text-[16px] font-bold uppercase tracking-[0.01em] text-[var(--text)]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-[var(--dim)]">
                    {c.summary}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      <section
        ref={processRef}
        id={processId}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(processId)}>
            {divisionPageStrings.processEyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-[620px] text-[15px] text-[var(--dim)]">
            {copy.process}
          </p>
        </Reveal>
        <Reveal delay={2}>
          <a
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 bg-[var(--accent)] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink)] no-underline transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(78,242,211,0.22)]"
          >
            {divisionPageStrings.cta}
          </a>
        </Reveal>
      </section>
    </main>
  )
}

export default DivisionPageContent
