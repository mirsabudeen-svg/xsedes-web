import type { Metadata } from "next"
import Link from "next/link"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import {
  getProductFamily,
  servicePillars,
  servicesIntro,
  servicesOverview,
  xsmithsSite,
} from "@/content/xsmiths"
import { xsmithsPageMetadata } from "@/lib/xsmiths/metadata"
import { touchCta, touchLink } from "@/lib/xsmiths/touch-target"

export const metadata: Metadata = xsmithsPageMetadata(
  "Services",
  "Strategy & Design, Engineering & Fabrication, and Operations — delivered through X-Consult, X-Lab, X-Build, and X-Ops.",
  "/services",
)

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

/**
 * Services (IA §8.5):
 * Threshold → three pillar rooms → partner doctrine → conversation.
 * All pillar copy from `servicePillars` — homepage Scene 04 uses the same
 * source with slice(0, 4) for preview density only.
 */
export default function ServicesPage() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ Services</XsmithsSectionLabel>
      <h1 className="max-w-[16ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        {servicesOverview.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        {servicesIntro}
      </p>

      <div className="mt-20 flex max-w-[var(--xs-container-standard,900px)] flex-col">
        {servicePillars.map((pillar, index) => {
          const related = pillar.relatedFamilies
            .map((slug) => getProductFamily(slug))
            .filter((family): family is NonNullable<typeof family> =>
              Boolean(family),
            )

          return (
            <section
              key={pillar.slug}
              id={pillar.slug}
              aria-labelledby={`pillar-${pillar.slug}`}
              className={
                index === 0
                  ? "border-t-2 border-[var(--accent)] pt-10"
                  : "mt-20 border-t border-[var(--hairline)] pt-16"
              }
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
                {pillar.division}
              </p>
              <h2
                id={`pillar-${pillar.slug}`}
                className="mt-3 text-[var(--xs-type-heading-md,clamp(28px,3.5vw,40px))] font-semibold tracking-[0.02em] text-[var(--text)]"
              >
                {pillar.name}
              </h2>
              <p className="mt-5 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
                {pillar.summary}
              </p>

              <h3 className="mt-10 text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]">
                Capabilities
              </h3>
              <ul className="mt-4 space-y-2 text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--text)]">
                {pillar.capabilities.map((cap) => (
                  <li key={cap}>{cap}</li>
                ))}
              </ul>

              {related.length > 0 ? (
                <div className="mt-10">
                  <h3 className="text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]">
                    Related product families
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {related.map((family) => (
                      <li key={family.slug}>
                        <Link
                          href={`${xsmithsSite.basePath}/products/${family.slug}`}
                          className={`${touchLink} text-[14px] text-[var(--text)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
                        >
                          {family.number} {family.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          )
        })}
      </div>

      <p className="mt-20 max-w-[62ch] border-l-2 border-[var(--accent)] pl-6 text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
        {xsmithsSite.partnerStatement}
      </p>

      <div className="mt-16 border-t border-[var(--hairline)] pt-12">
        <Link
          href={`${xsmithsSite.basePath}/contact`}
          className={`${touchCta} ${focusRing}`}
        >
          Start a conversation
        </Link>
      </div>
    </XsmithsMain>
  )
}
