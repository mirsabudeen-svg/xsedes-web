import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import {
  getJournalBody,
  getJournalEntry,
  getProductFamily,
  getRelatedEntries,
  journalEntries,
  xsmithsSite,
  xsmithsUrl,
} from "@/content/xsmiths"

type PageProps = {
  params: Promise<{ slug: string }>
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

export function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getJournalEntry(slug)
  if (!entry) return {}
  return {
    title: entry.title,
    description: entry.thesis,
    alternates: { canonical: xsmithsUrl(`/journal/${entry.slug}`) },
  }
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params
  const entry = getJournalEntry(slug)
  const Body = getJournalBody(slug)
  if (!entry || !Body) notFound()

  const related = getRelatedEntries(slug)

  return (
    <XsmithsMain>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--dim)]">
          <li>
            <Link
              href={`${xsmithsSite.basePath}/journal`}
              className={`no-underline hover:text-[var(--accent)] ${focusRing}`}
            >
              Journal
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[var(--text)]">
            {entry.title}
          </li>
        </ol>
      </nav>

      <XsmithsSectionLabel>§ Journal</XsmithsSectionLabel>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--dim)]">
        {entry.domain} · {entry.readingMinutes} min read
      </p>
      <h1 className="mt-4 max-w-[18ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold leading-[1.08] tracking-[0.01em]">
        {entry.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[var(--xs-type-body-lg,18px)] font-light leading-relaxed text-[var(--text)]">
        {entry.thesis}
      </p>

      <div className="mt-14 border-t border-[var(--hairline)] pt-14">
        <Body />
      </div>

      {entry.relatedFamilies.length > 0 ? (
        <section
          className="mt-16 border-t border-[var(--hairline)] pt-12"
          aria-label="Related product families"
        >
          <h2 className="text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]">
            Related families
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {entry.relatedFamilies.map((familySlug) => {
              const family = getProductFamily(familySlug)
              if (!family) return null
              return (
                <li key={familySlug}>
                  <Link
                    href={`${xsmithsSite.basePath}/products/${family.slug}`}
                    className={`text-[12px] uppercase tracking-[0.16em] text-[var(--dim)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
                  >
                    {family.number} {family.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section
          className="mt-16 border-t border-[var(--hairline)] pt-12"
          aria-label="Continue reading"
        >
          <h2 className="text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]">
            Continue reading
          </h2>
          <ul className="mt-6 space-y-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`${xsmithsSite.basePath}/journal/${item.slug}`}
                  className={`text-[var(--xs-type-title,22px)] font-semibold text-[var(--text)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </XsmithsMain>
  )
}
