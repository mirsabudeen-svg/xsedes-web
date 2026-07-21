"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import XsmithsBeliefLine from "@/components/xsmiths/XsmithsBeliefLine"
import ProductFamilyGrid from "@/components/xsmiths/ProductFamilyGrid"
import XsmithsLogo from "@/components/xsmiths/XsmithsLogo"
import XsmithsReticle from "@/components/xsmiths/XsmithsReticle"
import XsmithsReveal from "@/components/xsmiths/XsmithsReveal"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import {
  philosophyBeliefs,
  servicePillars,
  servicesIntro,
  xsmithsSite,
} from "@/content/xsmiths"
import { touchLink } from "@/lib/xsmiths/touch-target"
import { brandEase } from "@/lib/motion"

/**
 * Hero-only entrance (Design System §9.7: Motion permitted on the homepage
 * hero exclusively; all scroll choreography below uses GSAP via
 * XsmithsReveal).
 */
function fadeUp(delay: number, reduce: boolean | null) {
  if (reduce) return undefined
  return {
    initial: { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, ease: brandEase, delay },
  }
}

/**
 * Homepage — five scenes (IA Part 7):
 * 01 Threshold · 02 Belief · 03 Capability · 04 Delivery · 05 Invitation
 * (Scene 05 lives in the shared footer). Proof, Industries, and Technology
 * are deliberately absent from Home — mechanism never precedes wonder.
 */
export default function HomePage() {
  const reduce = useReducedMotion()

  return (
    <main id="main-content" tabIndex={-1}>
      {/* Scene 01 — Threshold. Wordmark; no CTA — threshold, not billboard. */}
      <section
        aria-label="Threshold"
        className="relative flex min-h-[var(--xs-size-hero-min,92vh)] flex-col items-center justify-center overflow-hidden px-[var(--xs-container-pad,5%)] py-10 text-center"
      >
        <XsmithsReticle />
        <motion.h1
          className="m-0 flex justify-center"
          {...fadeUp(0, reduce)}
        >
          <XsmithsLogo variant="hero" linked={false} priority />
        </motion.h1>
        <motion.p
          className="mt-8 text-[18px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)]"
          {...fadeUp(0.15, reduce)}
        >
          {xsmithsSite.tagline}
        </motion.p>
        <motion.p
          className="mt-8 max-w-[var(--xs-container-reading,620px)] text-[var(--xs-type-body-lg,18px)] font-light leading-relaxed text-[var(--dim)]"
          {...fadeUp(0.3, reduce)}
        >
          {xsmithsSite.pitch}
        </motion.p>
        <motion.p
          className="mt-11 text-[12px] uppercase tracking-[0.28em] text-[var(--dim)]"
          {...fadeUp(0.45, reduce)}
        >
          {xsmithsSite.venturePrefix}{" "}
          <Link
            href={xsmithsSite.parentHref}
            className={`${touchLink} text-[var(--dim)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
          >
            {xsmithsSite.parentName}
          </Link>
        </motion.p>
      </section>

      {/* Scene 02 — Belief. Five laws revealed as one poem (Design System §9.3). */}
      <section
        aria-label="Belief"
        className="border-b border-[var(--hairline)] px-[var(--xs-container-pad,5%)] py-[var(--xs-space-30,120px)]"
      >
        <XsmithsSectionLabel>§ 01 · Belief</XsmithsSectionLabel>
        <XsmithsReveal>
          <div className="mx-auto flex max-w-[var(--xs-container-standard,900px)] flex-col">
            {philosophyBeliefs.map((belief) => (
              <div
                key={belief.number}
                className="flex items-baseline gap-8 border-b border-[var(--hairline)] py-7 last:border-b-0"
              >
                <span className="min-w-10 text-[13px] tracking-[0.08em] text-[var(--dim)]">
                  {belief.number}
                </span>
                <p className="text-[clamp(22px,3vw,34px)] font-normal text-[var(--text)]">
                  <XsmithsBeliefLine
                    line={belief.line}
                    emphasis={belief.emphasis}
                  />
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-[720px] text-center text-[var(--xs-type-body-sm,15px)] leading-relaxed text-[var(--dim)]">
            {xsmithsSite.partnerStatement}
          </p>
        </XsmithsReveal>
      </section>

      {/* Scene 03 — Capability. Nine doors; hover is attention, click enters. */}
      <section
        aria-label="Product ecosystem"
        className="border-b border-[var(--hairline)] px-[var(--xs-container-pad,5%)] py-[var(--xs-space-30,120px)]"
      >
        <XsmithsSectionLabel>§ 02 · Product Ecosystem</XsmithsSectionLabel>
        <XsmithsReveal>
          <ProductFamilyGrid />
        </XsmithsReveal>
      </section>

      {/* Scene 04 — Delivery. Craft has an operating system. */}
      <section
        aria-label="Services"
        className="border-b border-[var(--hairline)] px-[var(--xs-container-pad,5%)] py-[var(--xs-space-30,120px)]"
      >
        <XsmithsSectionLabel>§ 03 · Services</XsmithsSectionLabel>
        <XsmithsReveal>
          <p className="mx-auto mb-14 max-w-[60ch] text-center text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
            {servicesIntro}
          </p>
        </XsmithsReveal>
        <XsmithsReveal stagger>
          <div className="mx-auto grid max-w-[var(--xs-container-wide,1100px)] grid-cols-1 gap-12 md:grid-cols-3">
            {servicePillars.map((pillar) => (
              <Link
                key={pillar.slug}
                data-reveal-item
                href={`${xsmithsSite.basePath}/services`}
                className="border-t-2 border-[var(--accent)] pt-6 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                <p className="mb-3.5 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
                  {pillar.division}
                </p>
                <h2 className="mb-3.5 text-[24px] font-semibold text-[var(--text)]">
                  {pillar.name}
                </h2>
                <ul className="space-y-1 text-[14px] font-light leading-relaxed text-[var(--dim)]">
                  {pillar.capabilities.slice(0, 4).map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </XsmithsReveal>
      </section>
    </main>
  )
}
