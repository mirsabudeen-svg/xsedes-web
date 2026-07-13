"use client"

import { useCallback, type MouseEvent } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { useSmoothScroll } from "@/components/providers/SmoothScroll"
import { useRegisterStage } from "@/hooks/useRegisterStage"
import { hero } from "@/content/site"

const Hero = () => {
  const stageRef = useRegisterStage("discover")
  const { reducedMotion } = useMissionProgress()
  const { scrollTo } = useSmoothScroll()

  const handlePrimary = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      scrollTo("#s-consult", { immediate: reducedMotion })
    },
    [reducedMotion, scrollTo],
  )

  const handleSecondary = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      scrollTo("#s-final", { immediate: reducedMotion })
    },
    [reducedMotion, scrollTo],
  )

  return (
    <section
      ref={stageRef}
      id="s-discover"
      className="relative flex min-h-screen flex-col justify-center border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
    >
      <CornerMarks />

      <Reveal>
        <div className="mb-[26px] text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {hero.kicker}
        </div>
      </Reveal>

      <Reveal delay={1}>
        <h1 className="text-[clamp(40px,6.4vw,86px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
          {hero.lines[0]}
          <br />
          {hero.lines[1]}
          <br />
          {hero.lines[2]}
          <span className="text-[var(--accent)]">.</span>
        </h1>
      </Reveal>

      <Reveal delay={2}>
        <p className="mt-7 max-w-[620px] text-[clamp(16px,1.35vw,19px)] font-normal text-[var(--dim)]">
          {hero.ledeBefore}
          <strong className="font-semibold text-[var(--text)]">
            {hero.ledeEmphasis}
          </strong>
          {hero.ledeAfter}
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-14 flex flex-wrap items-center gap-[26px]">
          <a
            href="#s-consult"
            onClick={handlePrimary}
            className="inline-flex items-center gap-3 bg-[var(--accent)] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink)] no-underline transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(78,242,211,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#s-final"
            onClick={handleSecondary}
            className="inline-flex items-center gap-3 border border-[var(--hairline-strong)] bg-transparent px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text)] no-underline transition-[border-color,transform] duration-500 ease-[var(--ease)] hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {hero.secondaryCta}
          </a>
        </div>
      </Reveal>

      <Reveal delay={4}>
        <div className="mt-[60px] flex items-center gap-3 text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--faint)]">
          <span
            aria-hidden="true"
            className={`h-[7px] w-[7px] rounded-full bg-[var(--accent)] ${
              reducedMotion
                ? "opacity-100"
                : "animate-[hintPulse_2.4s_ease-in-out_infinite]"
            }`}
          />
          {hero.scrollHint}
        </div>
      </Reveal>
    </section>
  )
}

export default Hero
