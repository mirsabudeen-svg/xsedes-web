"use client"

import { useCallback } from "react"
import Link from "next/link"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import type { CaseStudy } from "@/content/case-studies"
import { workPageStrings } from "@/content/case-studies"

type CaseStudyContentProps = {
  entry: CaseStudy
  divisionLabel: string
}

const CaseStudyContent = ({ entry, divisionLabel }: CaseStudyContentProps) => {
  const sectionId = `s-case-study-${entry.slug}`
  const { clearedSections, registerClearable } = useMissionProgress()

  const sectionRef = useCallback(
    (el: HTMLElement | null) => registerClearable(sectionId, el),
    [registerClearable, sectionId],
  )

  return (
    <main>
      <article>
        <section
          ref={sectionRef}
          id={sectionId}
          className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
        >
          <CornerMarks />
          <Reveal>
            <SectionLabel cleared={clearedSections.has(sectionId)}>
              {`§ ${divisionLabel.toUpperCase()} · ${entry.industry}`}
            </SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="text-[clamp(32px,4.4vw,58px)] font-extrabold uppercase leading-[1.05] tracking-[0.015em]">
              {entry.title}
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-[640px] text-[clamp(18px,1.8vw,24px)] font-normal text-[var(--dim)]">
              {entry.summary}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div
              role="img"
              aria-label={entry.coverAlt}
              className="mt-14 flex aspect-video items-center justify-center border border-dashed border-[var(--hairline-strong)] px-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--faint)]"
            >
              {workPageStrings.coverPlaceholder}
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
                  § PROBLEM
                </p>
                <p className="text-[14px] text-[var(--dim)]">{entry.problem}</p>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
                  § APPROACH
                </p>
                <p className="text-[14px] text-[var(--dim)]">{entry.approach}</p>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
                  § BUILD
                </p>
                <p className="text-[14px] text-[var(--dim)]">{entry.build}</p>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
                  § OUTCOME
                </p>
                <p className="text-[14px] text-[var(--dim)]">{entry.outcome}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <p className="mt-14 max-w-[640px] text-[15px] leading-[1.7] text-[var(--dim)]">
              {entry.body}
            </p>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-14 flex flex-wrap gap-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-3 border border-[var(--hairline-strong)] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text)] no-underline transition-colors duration-500 ease-[var(--ease)] hover:border-[var(--accent)]"
              >
                {workPageStrings.backToWork}
              </Link>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-[var(--accent)] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink)] no-underline transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(78,242,211,0.22)]"
              >
                {workPageStrings.cta}
              </a>
            </div>
          </Reveal>
        </section>
      </article>
    </main>
  )
}

export default CaseStudyContent
