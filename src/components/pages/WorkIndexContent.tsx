"use client"

import { useCallback, useMemo, useState } from "react"
import Link from "next/link"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import type { CaseStudy } from "@/content/case-studies"
import { workPageStrings } from "@/content/case-studies"
import { divisions } from "@/content/divisions"

const SECTION_ID = "s-work-index"
const ALL = "all"

type WorkIndexContentProps = {
  caseStudies: readonly CaseStudy[]
  industries: readonly string[]
}

/**
 * /work index — ported from website/src/pages/work/index.astro. The Astro
 * source filtered case-study cards client-side with vanilla JS; here the
 * same behaviour is React state instead of DOM manipulation.
 */
const WorkIndexContent = ({ caseStudies, industries }: WorkIndexContentProps) => {
  const { clearedSections, registerClearable } = useMissionProgress()
  const [division, setDivision] = useState<string>(ALL)
  const [industry, setIndustry] = useState<string>(ALL)

  const sectionRef = useCallback(
    (el: HTMLElement | null) => registerClearable(SECTION_ID, el),
    [registerClearable],
  )

  const filtered = useMemo(
    () =>
      caseStudies.filter(
        (c) =>
          (division === ALL || c.division === division) &&
          (industry === ALL || c.industry === industry),
      ),
    [caseStudies, division, industry],
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
            {workPageStrings.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="text-[clamp(34px,4.8vw,64px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {workPageStrings.title}
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <div
            aria-label="Filter case studies"
            className="mt-12 flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]">
                {workPageStrings.divisionFilterLabel}
              </span>
              <button
                type="button"
                onClick={() => setDivision(ALL)}
                className={`border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ease-[var(--ease)] ${
                  division === ALL
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-[var(--hairline)] text-[var(--dim)] hover:border-[var(--accent)]"
                }`}
              >
                {workPageStrings.all}
              </button>
              {divisions.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDivision(d.id)}
                  className={`border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ease-[var(--ease)] ${
                    division === d.id
                      ? "border-[var(--accent)] text-[var(--accent)]"
                      : "border-[var(--hairline)] text-[var(--dim)] hover:border-[var(--accent)]"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]">
                {workPageStrings.industryFilterLabel}
              </span>
              <button
                type="button"
                onClick={() => setIndustry(ALL)}
                className={`border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ease-[var(--ease)] ${
                  industry === ALL
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-[var(--hairline)] text-[var(--dim)] hover:border-[var(--accent)]"
                }`}
              >
                {workPageStrings.all}
              </button>
              {industries.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndustry(i)}
                  className={`border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ease-[var(--ease)] ${
                    industry === i
                      ? "border-[var(--accent)] text-[var(--accent)]"
                      : "border-[var(--hairline)] text-[var(--dim)] hover:border-[var(--accent)]"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={3}>
          {filtered.length === 0 ? (
            <p className="mt-12 text-[14px] text-[var(--faint)]">
              {workPageStrings.noResults}
            </p>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-px border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-3">
              {filtered.map((c) => {
                const divisionLabel = divisions.find(
                  (d) => d.id === c.division,
                )?.name
                return (
                  <Link
                    key={c.slug}
                    href={`/work/${c.slug}`}
                    className="group relative block overflow-hidden bg-[var(--ink)] px-6 pb-7 pt-6 no-underline transition-[background,transform] duration-500 ease-[var(--ease)] hover:-translate-y-0.5 hover:bg-[var(--glass)] focus-visible:bg-[var(--glass)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute right-3.5 top-3.5 h-3 w-3 border-r border-t border-[var(--hairline-strong)] transition-[border-color] duration-500 ease-[var(--ease)] group-hover:border-[var(--accent)]"
                    />
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                      {divisionLabel} · {c.industry}
                    </p>
                    <h2 className="text-[16px] font-bold uppercase tracking-[0.01em] text-[var(--text)]">
                      {c.title}
                    </h2>
                    <p className="mt-2 text-[13px] text-[var(--dim)]">
                      {c.summary}
                    </p>
                  </Link>
                )
              })}
            </div>
          )}
        </Reveal>
      </section>
    </main>
  )
}

export default WorkIndexContent
