"use client"

import { useCallback } from "react"
import Link from "next/link"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { site } from "@/content/site"
import {
  subBrandBackLink,
  ventureChrome,
  type VenturePageCopy,
} from "@/content/venture-pages"

type VenturePageContentProps = {
  venture: VenturePageCopy
}

/**
 * Venture landing â€” intentional isolation with minimal chrome
 * (wordmark + Contact) so the page still wayfinds without full site shell.
 */
const VenturePageContent = ({ venture }: VenturePageContentProps) => {
  const sectionId = `s-venture-${venture.slug}`
  const { registerClearable } = useMissionProgress()

  const sectionRef = useCallback(
    (el: HTMLElement | null) => registerClearable(sectionId, el),
    [registerClearable, sectionId],
  )

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-[var(--hairline)] bg-black/55 px-5 py-3.5 backdrop-blur-[8px]">
        <Link
          href="/"
          aria-label={ventureChrome.homeAria}
          className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[var(--text)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          {site.name}
          <span className="text-[var(--accent)]">.</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={subBrandBackLink.href}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--faint)] no-underline transition-colors duration-300 hover:text-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:outline-none"
          >
            {subBrandBackLink.label}
          </Link>
          <Link
            href={ventureChrome.contactHref}
            className="border border-[var(--accent)] bg-transparent px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] no-underline transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {ventureChrome.contactLabel}
          </Link>
        </div>
      </header>

      <section
        ref={sectionRef}
        id={sectionId}
        className="relative flex min-h-screen flex-col items-center justify-center gap-6 border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[140px] text-center"
      >
        <CornerMarks />
        <Reveal wipe>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {venture.industry}
          </p>
        </Reveal>
        <Reveal delay={1} wipe>
          <h1 className="text-[clamp(40px,6.4vw,86px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {venture.label}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="max-w-[48ch] text-[15px] text-[var(--dim)]">
            {venture.lede}
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p className="mt-2 max-w-[42ch] text-[12px] uppercase tracking-[0.18em] text-[var(--faint)]">
            Incubated inside {site.name}
          </p>
        </Reveal>
      </section>
    </main>
  )
}

export default VenturePageContent
