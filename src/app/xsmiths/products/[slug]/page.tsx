import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import {
  getAdjacentFamilies,
  getProductFamily,
  productFamilies,
  servicePillars,
  xsmithsSite,
  xsmithsUrl,
} from "@/content/xsmiths"
import { xsmithsPageMetadata } from "@/lib/xsmiths/metadata"
import { touchCta, touchLink } from "@/lib/xsmiths/touch-target"

type PageProps = {
  params: Promise<{ slug: string }>
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

export function generateStaticParams() {
  return productFamilies.map((family) => ({ slug: family.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const family = getProductFamily(slug)
  if (!family) return {}
  return xsmithsPageMetadata(
    family.name,
    family.focus,
    `/products/${family.slug}`,
  )
}

/**
 * Family room (IA §8.4, Part 13):
 * Threshold → Discovery (description) → Understanding (contexts) →
 * Operation (services) → Doctrine → Conversation.
 * All copy from `productFamilies` — no paraphrase, no proof points.
 */
export default async function ProductFamilyPage({ params }: PageProps) {
  const { slug } = await params
  const family = getProductFamily(slug)
  if (!family) notFound()

  const { previous, next } = getAdjacentFamilies(family.slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: family.name,
    description: family.description,
    url: xsmithsUrl(`/products/${family.slug}`),
    provider: { "@type": "Organization", name: xsmithsSite.name },
  }

  return (
    <XsmithsMain>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--dim)]">
          <li>
            <Link
              href={`${xsmithsSite.basePath}/products`}
              className={`${touchLink} no-underline hover:text-[var(--accent)] ${focusRing}`}
            >
              Products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[var(--text)]">
            {family.name}
          </li>
        </ol>
      </nav>

      <p className="mt-14 text-[12px] uppercase tracking-[0.22em] text-[var(--dim)]">
        {family.number} · Product family
      </p>
      <h1 className="mt-4 text-[var(--xs-type-display-lg,clamp(40px,6vw,86px))] font-bold uppercase leading-[1.02] tracking-[0.04em]">
        {family.name}
      </h1>
      <p className="mt-4 max-w-[48ch] text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
        {family.focus}
      </p>

      <p className="mt-8 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        {family.description}
      </p>

      <section className="mt-14" aria-label="Applications">
        <h2 className="text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]">
          Where it lives
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {family.contexts.map((context) => (
            <li
              key={context}
              className="border border-[var(--hairline)] px-3 py-1.5 text-[13px] tracking-[0.04em] text-[var(--text)]"
            >
              {context}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mt-16 border-t border-[var(--hairline)] pt-12"
        aria-label="How it is delivered"
      >
        <h2 className="text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]">
          How it is delivered
        </h2>
        <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
          {servicePillars.map((pillar) => (
            <li key={pillar.slug}>
              <Link
                href={`${xsmithsSite.basePath}/services`}
                className={`${touchLink} text-[14px] text-[var(--text)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
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

      <p className="mt-14 max-w-[56ch] text-[14px] leading-relaxed text-[var(--dim)]">
        {xsmithsSite.partnerStatement}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          href={`${xsmithsSite.basePath}/contact`}
          className={`${touchCta} ${focusRing}`}
        >
          Start a conversation
        </Link>
        <Link
          href={`${xsmithsSite.basePath}/products`}
          className={`${touchLink} text-[12px] uppercase tracking-[0.18em] text-[var(--dim)] no-underline hover:text-[var(--accent)] ${focusRing}`}
        >
          All products
        </Link>
      </div>

      <nav
        aria-label="Adjacent product families"
        className="mt-20 flex justify-between gap-6 border-t border-[var(--hairline)] pt-8"
      >
        {previous ? (
          <Link
            href={`${xsmithsSite.basePath}/products/${previous.slug}`}
            className={`${touchLink} text-[12px] uppercase tracking-[0.16em] text-[var(--dim)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
          >
            ← {previous.number} {previous.name}
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
        {next ? (
          <Link
            href={`${xsmithsSite.basePath}/products/${next.slug}`}
            className={`${touchLink} text-right text-[12px] uppercase tracking-[0.16em] text-[var(--dim)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
          >
            {next.number} {next.name} →
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
      </nav>
    </XsmithsMain>
  )
}
