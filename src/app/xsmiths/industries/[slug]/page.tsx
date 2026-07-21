import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import {
  getIndustryLens,
  getProductFamily,
  industryLenses,
  servicePillars,
  xsmithsSite,
  xsmithsUrl,
} from "@/content/xsmiths"

type PageProps = {
  params: Promise<{ slug: string }>
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

export function generateStaticParams() {
  return industryLenses.map((lens) => ({ slug: lens.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const lens = getIndustryLens(slug)
  if (!lens) return {}
  return {
    title: lens.name,
    description: lens.elevator,
    alternates: { canonical: xsmithsUrl(`/industries/${lens.slug}`) },
  }
}

/**
 * Industry lens (IA §8.7): Threshold (industry elevator) → Recognition
 * (partner stance) → Discovery (relevant families only) → Confidence
 * (the honest answer to this audience's concern + services) → Conversation.
 * ~70% universal spine, ~30% lens.
 */
export default async function IndustryLensPage({ params }: PageProps) {
  const { slug } = await params
  const lens = getIndustryLens(slug)
  if (!lens) notFound()

  const families = lens.emphasizedFamilies
    .map((familySlug) => getProductFamily(familySlug))
    .filter((family) => family !== undefined)

  return (
    <XsmithsMain>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--dim)]">
          <li>
            <Link
              href={`${xsmithsSite.basePath}/industries`}
              className={`no-underline hover:text-[var(--accent)] ${focusRing}`}
            >
              Industries
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[var(--text)]">
            {lens.name}
          </li>
        </ol>
      </nav>

      {/* Threshold. */}
      <h1 className="mt-14 max-w-[18ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        {lens.name}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        {lens.elevator}
      </p>

      {/* Recognition — partner doctrine, universal spine. */}
      <p className="mt-10 max-w-[56ch] border-l-2 border-[var(--accent)] pl-6 text-[var(--xs-type-body-sm,15px)] leading-relaxed text-[var(--dim)]">
        {xsmithsSite.partnerStatement}
      </p>

      {/* Discovery — relevant families only. */}
      <section className="mt-16" aria-label="Relevant product families">
        <h2 className="text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]">
          The families doing the work
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-px border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-2">
          {families.map((family) => (
            <Link
              key={family.slug}
              href={`${xsmithsSite.basePath}/products/${family.slug}`}
              className="group bg-[var(--ink)] px-7 py-8 no-underline transition-colors duration-[var(--xs-duration-ui,250ms)] hover:bg-[var(--xs-surface-hover,rgba(255,255,255,0.03))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
            >
              <span className="text-[12px] tracking-[0.16em] text-[var(--dim)]">
                {family.number}
              </span>
              <h3 className="mt-3 text-[var(--xs-type-title,22px)] font-semibold tracking-[0.06em] text-[var(--text)] transition-colors duration-[var(--xs-duration-fast,200ms)] group-hover:text-[var(--accent)]">
                {family.name}
              </h3>
              <p className="mt-2 text-[14px] font-light leading-relaxed text-[var(--dim)]">
                {family.focus}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Confidence — the honest engineering answer. */}
      <section
        className="mt-16 border-t border-[var(--hairline)] pt-12"
        aria-label="Engineering for this environment"
      >
        <h2 className="text-[var(--xs-type-heading-md,clamp(24px,3vw,36px))] font-semibold tracking-[0.02em]">
          {lens.concernTitle}
        </h2>
        <p className="mt-5 max-w-[68ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
          {lens.concern}
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
          {servicePillars.map((pillar) => (
            <li key={pillar.slug}>
              <Link
                href={`${xsmithsSite.basePath}/services`}
                className={`text-[14px] text-[var(--text)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
              >
                {pillar.name}
                <span className="ml-2 text-[11px] uppercase tracking-[0.14em] text-[var(--dim)]">
                  {pillar.division}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Conversation. */}
      <div className="mt-14 flex flex-wrap items-center gap-6">
        <Link
          href={`${xsmithsSite.basePath}/contact`}
          className={`inline-flex min-h-[var(--xs-size-touch-min,44px)] items-center border border-[var(--accent)] px-[34px] text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:bg-[var(--accent)] hover:text-[var(--xs-text-inverse,#000)] ${focusRing}`}
        >
          Tell us about the space
        </Link>
        <Link
          href={`${xsmithsSite.basePath}/industries`}
          className={`text-[12px] uppercase tracking-[0.18em] text-[var(--dim)] no-underline hover:text-[var(--accent)] ${focusRing}`}
        >
          All industries
        </Link>
      </div>
    </XsmithsMain>
  )
}
