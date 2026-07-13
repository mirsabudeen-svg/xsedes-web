"use client"

import { useCallback, type MouseEvent } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import {
  bootGate,
  contactEmail,
  final,
  values,
} from "@/content/site"

const FINAL_ID = "s-final"

const Final = () => {
  const { clearedSections, registerClearable, complete } = useMissionProgress()
  const cleared = clearedSections.has(FINAL_ID)

  const sectionRef = useCallback(
    (el: HTMLElement | null) => {
      registerClearable(FINAL_ID, el)
    },
    [registerClearable],
  )

  const handleReplay = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      try {
        sessionStorage.removeItem(bootGate.sessionKey)
      } catch {
        // sessionStorage may be unavailable
      }
      window.location.assign("/#s-discover")
    },
    [],
  )

  return (
    <section
      ref={sectionRef}
      id={FINAL_ID}
      className="relative flex min-h-[88vh] flex-col justify-center border-b-0 px-[clamp(28px,7vw,110px)] py-[120px]"
    >
      <CornerMarks />

      <Reveal>
        <SectionLabel cleared={cleared}>{final.eyebrow}</SectionLabel>
      </Reveal>

      <Reveal delay={1}>
        <h2 className="text-[clamp(30px,4.2vw,56px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
          {final.headlineBefore}
          <span className="text-[var(--accent)]">{final.headlineAccent}</span>
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <p className="mt-7 max-w-[620px] text-[clamp(16px,1.35vw,19px)] font-normal text-[var(--dim)]">
          {final.lede}
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-11 flex max-w-[760px] flex-wrap gap-3">
          {values.map((value) => (
            <span
              key={value}
              className="border border-[var(--hairline-strong)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)]"
            >
              {value}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-14 flex flex-wrap items-center gap-[26px]">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-3 bg-[var(--accent)] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink)] no-underline transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(78,242,211,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
          >
            {final.primaryCta}
          </a>
          <a
            href="#s-discover"
            onClick={handleReplay}
            className="inline-flex items-center gap-3 border border-[var(--hairline-strong)] bg-transparent px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text)] no-underline transition-[border-color,transform] duration-500 ease-[var(--ease)] hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {final.secondaryCta}
          </a>
        </div>
      </Reveal>

      <Reveal delay={4}>
        <div className="mt-16 flex flex-wrap gap-[34px] border-t border-[var(--hairline)] pt-[22px] text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]">
          {final.systemLabels.map((label) => (
            <span key={label}>
              {label}{" "}
              <span
                aria-hidden="true"
                className={`transition-colors duration-[800ms] ease-[var(--ease)] ${
                  complete ? "text-[var(--accent)]" : "text-[var(--faint)]"
                }`}
              >
                ●
              </span>
            </span>
          ))}
          <span
            className={`transition-colors duration-[800ms] ease-[var(--ease)] ${
              complete ? "text-[var(--accent)]" : "text-[var(--faint)]"
            }`}
          >
            {complete ? final.systemOperational : final.systemStandby}
          </span>
        </div>
      </Reveal>
    </section>
  )
}

export default Final
