"use client"

import { useCallback } from "react"
import Link from "next/link"
import Reveal from "@/components/ui/Reveal"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { subBrandBackLink, type VenturePageCopy } from "@/content/venture-pages"

type VenturePageContentProps = {
  venture: VenturePageCopy
}

/**
 * Individual venture landing — chromeless (no SiteHeader/SiteFooter/rail).
 * Layout chrome is suppressed via isChromelessPath in SiteChrome + MissionShell.
 * Only the "← XSEDES" back link remains.
 */
const VenturePageContent = ({ venture }: VenturePageContentProps) => {
  const sectionId = `s-venture-${venture.slug}`
  const { registerClearable } = useMissionProgress()

  const sectionRef = useCallback(
    (el: HTMLElement | null) => registerClearable(sectionId, el),
    [registerClearable, sectionId],
  )

  return (
    <main>
      <Link
        href={subBrandBackLink.href}
        className="fixed left-5 top-5 z-10 border border-[var(--hairline-strong)] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
      >
        {subBrandBackLink.label}
      </Link>

      <section
        ref={sectionRef}
        id={sectionId}
        className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-[clamp(28px,7vw,110px)] py-[120px] text-center"
      >
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {venture.label}
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="text-[clamp(40px,6.4vw,86px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {venture.label}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="max-w-[48ch] text-[15px] text-[var(--dim)]">
            {venture.lede}
          </p>
        </Reveal>
      </section>
    </main>
  )
}

export default VenturePageContent
