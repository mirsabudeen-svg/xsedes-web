import type { Metadata } from "next"
import Link from "next/link"
import TechnologyDiagram from "@/components/xsmiths/TechnologyDiagram"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import {
  getProductFamily,
  technologyContent,
  xsmithsSite,
  xsmithsUrl,
} from "@/content/xsmiths"

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How XSMITHS systems are engineered — four layers: sense, decide, respond, operate. One system, one accountable team.",
  alternates: { canonical: xsmithsUrl("/technology") },
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

/**
 * Technology — mechanism deep-dive (IA §8.10). This room sits AFTER wonder
 * in the journey: it is linked from family pages and the footer, never
 * pushed at arriving visitors. Arc: Threshold (one system metaphor) →
 * Discovery (layers) → Understanding (integration) → Conversation.
 */
export default function TechnologyPage() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ Technology</XsmithsSectionLabel>
      <h1 className="max-w-[18ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        {technologyContent.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        {technologyContent.lede}
      </p>

      <div className="mt-16">
        <TechnologyDiagram />
      </div>

      {/* Discovery — the four layers. */}
      <section className="mt-20" aria-label="System layers">
        <div className="max-w-[var(--xs-container-standard,900px)]">
          {technologyContent.layers.map((layer) => (
            <article
              key={layer.number}
              className="border-b border-[var(--hairline)] py-10 last:border-b-0"
            >
              <div className="flex items-baseline gap-8">
                <span className="min-w-10 text-[13px] tracking-[0.08em] text-[var(--dim)]">
                  {layer.number}
                </span>
                <div>
                  <h2 className="text-[var(--xs-type-title,22px)] font-semibold uppercase tracking-[0.06em] text-[var(--text)]">
                    {layer.name}
                    <span className="ml-4 text-[13px] font-normal normal-case tracking-[0.02em] text-[var(--accent)]">
                      {layer.role}
                    </span>
                  </h2>
                  <p className="mt-3 max-w-[62ch] text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
                    {layer.detail}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {layer.families.map((slug) => {
                      const family = getProductFamily(slug)
                      if (!family) return null
                      return (
                        <li key={slug}>
                          <Link
                            href={`${xsmithsSite.basePath}/products/${slug}`}
                            className={`text-[12px] uppercase tracking-[0.16em] text-[var(--dim)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
                          >
                            {family.number} {family.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Understanding — integration with the studio method. */}
      <section
        className="mt-16 border-t border-[var(--hairline)] pt-14"
        aria-label="Integration"
      >
        <h2 className="text-[var(--xs-type-heading-md,clamp(24px,3vw,36px))] font-semibold tracking-[0.02em]">
          {technologyContent.integrationTitle}
        </h2>
        <p className="mt-5 max-w-[68ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
          {technologyContent.integration}
        </p>
      </section>

      <div className="mt-16 flex flex-wrap items-center gap-6">
        <Link
          href={`${xsmithsSite.basePath}/studio`}
          className={`text-[12px] uppercase tracking-[0.18em] text-[var(--dim)] no-underline hover:text-[var(--accent)] ${focusRing}`}
        >
          The studio
        </Link>
        <Link
          href={`${xsmithsSite.basePath}/contact`}
          className={`text-[12px] uppercase tracking-[0.18em] text-[var(--accent)] no-underline hover:opacity-80 ${focusRing}`}
        >
          Talk to the engineering team
        </Link>
      </div>
    </XsmithsMain>
  )
}
