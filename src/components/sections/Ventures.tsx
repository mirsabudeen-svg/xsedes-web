"use client"

import {
  useCallback,
  type CSSProperties,
  type PointerEvent,
} from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { venturesSection } from "@/content/site"
import { ventures, type Venture } from "@/content/ventures"

const VENTURES_ID = "s-ventures"

const handleCardPointerMove = (e: PointerEvent<HTMLElement>) => {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty("--gx", `${e.clientX - rect.left}px`)
  el.style.setProperty("--gy", `${e.clientY - rect.top}px`)
}

type VentureCardProps = {
  venture: Venture
}

const VentureCard = ({ venture }: VentureCardProps) => (
  <article
    data-venture={venture.id}
    onPointerMove={handleCardPointerMove}
    className="group relative overflow-hidden bg-[var(--ink)] px-7 pb-[38px] pt-[34px] transition-[background] duration-500 ease-[var(--ease)] hover:bg-[var(--glass)]"
    style={{ "--gx": "50%", "--gy": "50%" } as CSSProperties}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[450ms] ease-[var(--ease)] group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(220px circle at var(--gx) var(--gy), rgba(78,242,211,.09), transparent 70%)",
      }}
    />
    <span
      aria-hidden="true"
      className="absolute right-3.5 top-3.5 h-3 w-3 border-r border-t border-[var(--hairline-strong)] transition-[border-color] duration-500 ease-[var(--ease)] group-hover:border-[var(--accent)]"
    />
    <div className="relative mb-[18px] text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]">
      {venture.industry}
    </div>
    <h3 className="relative text-[20px] font-extrabold uppercase tracking-[0.04em]">
      {venture.name}
    </h3>
    <p className="relative mt-3.5 text-[14px] leading-[1.65] text-[var(--dim)]">
      {venture.oneLiner}
    </p>
  </article>
)

const Ventures = () => {
  const { clearedSections, registerClearable } = useMissionProgress()
  const cleared = clearedSections.has(VENTURES_ID)

  const sectionRef = useCallback(
    (el: HTMLElement | null) => {
      registerClearable(VENTURES_ID, el)
    },
    [registerClearable],
  )

  return (
    <section
      ref={sectionRef}
      id={VENTURES_ID}
      className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
    >
      <CornerMarks />

      <Reveal>
        <SectionLabel cleared={cleared}>{venturesSection.eyebrow}</SectionLabel>
      </Reveal>

      <Reveal delay={1}>
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
        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border border-[var(--hairline)] bg-[var(--hairline)]">
          {ventures.map((venture) => (
            <VentureCard key={venture.id} venture={venture} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default Ventures
