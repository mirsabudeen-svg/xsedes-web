import type { Metadata } from "next"
import Link from "next/link"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import { journalEntries, xsmithsSite, xsmithsUrl } from "@/content/xsmiths"

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Essays on experience engineering — design philosophy, reliability, and participation.",
  alternates: { canonical: xsmithsUrl("/journal") },
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

/**
 * Journal index (IA Part 15) — thought leadership without invented proof.
 * One thesis per piece; each links to at least one product family.
 */
export default function JournalPage() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ Journal</XsmithsSectionLabel>
      <h1 className="max-w-[16ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        Journal
      </h1>

      <div className="mt-16 flex max-w-[var(--xs-container-standard,900px)] flex-col">
        {journalEntries.map((entry) => (
          <article
            key={entry.slug}
            className="border-b border-[var(--hairline)] py-10 last:border-b-0"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--dim)]">
              {entry.domain} · {entry.readingMinutes} min read
            </p>
            <h2 className="mt-3 text-[var(--xs-type-heading-md,clamp(24px,3vw,36px))] font-semibold tracking-[0.02em]">
              <Link
                href={`${xsmithsSite.basePath}/journal/${entry.slug}`}
                className={`text-[var(--text)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
              >
                {entry.title}
              </Link>
            </h2>
            <p className="mt-4 max-w-[62ch] text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
              {entry.thesis}
            </p>
          </article>
        ))}
      </div>
    </XsmithsMain>
  )
}
