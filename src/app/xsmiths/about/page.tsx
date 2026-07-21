import type { Metadata } from "next"
import Link from "next/link"
import XsmithsBeliefLine from "@/components/xsmiths/XsmithsBeliefLine"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import {
  aboutContent,
  getJournalEntry,
  philosophyBeliefs,
  xsmithsSite,
} from "@/content/xsmiths"
import { xsmithsPageMetadata } from "@/lib/xsmiths/metadata"
import { touchCta, touchLink } from "@/lib/xsmiths/touch-target"

export const metadata: Metadata = xsmithsPageMetadata(
  "About",
  "The XSMITHS story, philosophy, and manifesto — experience engineering as a venture of XSEDES.",
  "/about",
)

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

/**
 * About (IA §8.2, §4.2):
 * Story → Mission & promise → Philosophy (full, with Journal deep-links) →
 * Manifesto (verbatim closing room) → Conversation.
 * All copy from `aboutContent` and `philosophyBeliefs` — homepage Scene 02
 * uses the same belief lines without detail or Journal links.
 */
export default function AboutPage() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ About</XsmithsSectionLabel>

      {/* 1 — Story */}
      <section aria-labelledby="about-story">
        <h1
          id="about-story"
          className="max-w-[18ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]"
        >
          {aboutContent.storyTitle}
        </h1>
        <div className="mt-8 max-w-[68ch] space-y-5 text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
          {aboutContent.story.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 max-w-[68ch] border-l-2 border-[var(--accent)] pl-6">
          <h2 className="text-[var(--xs-type-body-sm,15px)] font-semibold uppercase tracking-[0.14em] text-[var(--text)]">
            {aboutContent.engineeringVsEventsTitle}
          </h2>
          <p className="mt-4 text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
            {aboutContent.engineeringVsEvents}
          </p>
        </div>
      </section>

      {/* 2 — Mission & brand promise */}
      <section
        aria-labelledby="about-mission"
        className="mt-20 border-t border-[var(--hairline)] pt-16"
      >
        <h2
          id="about-mission"
          className="text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]"
        >
          Mission
        </h2>
        <p className="mt-5 max-w-[68ch] text-[var(--xs-type-heading-sm,clamp(20px,2.5vw,24px))] font-light leading-relaxed text-[var(--text)]">
          {aboutContent.mission}
        </p>

        <h2 className="mt-14 text-[12px] uppercase tracking-[0.2em] text-[var(--dim)]">
          Brand promise
        </h2>
        <p className="mt-5 max-w-[56ch] text-[var(--xs-type-heading-sm,clamp(20px,2.5vw,24px))] font-light leading-relaxed text-[var(--text)]">
          {aboutContent.brandPromise}
        </p>
        {(() => {
          const reliabilityEssay = getJournalEntry("reliability-is-the-wonder")
          if (!reliabilityEssay) return null
          return (
            <p className="mt-8">
              <Link
                href={`${xsmithsSite.basePath}/journal/${reliabilityEssay.slug}`}
                className={`${touchLink} text-[13px] uppercase tracking-[0.16em] text-[var(--accent)] no-underline transition-opacity duration-[var(--xs-duration-fast,200ms)] hover:opacity-80 ${focusRing}`}
              >
                Read in the Journal — {reliabilityEssay.title}
              </Link>
            </p>
          )
        })()}
      </section>

      {/* 3 — Philosophy (full elaboration; Journal links for deep reads) */}
      <section
        aria-labelledby="about-philosophy"
        className="mt-20 border-t border-[var(--hairline)] pt-16"
      >
        <XsmithsSectionLabel>§ Philosophy</XsmithsSectionLabel>
        <h2
          id="about-philosophy"
          className="sr-only"
        >
          Philosophy
        </h2>
        <div className="mx-auto flex max-w-[var(--xs-container-standard,900px)] flex-col">
          {philosophyBeliefs.map((belief) => {
            const journalEntry = belief.journalSlug
              ? getJournalEntry(belief.journalSlug)
              : undefined

            return (
              <article
                key={belief.number}
                className="border-b border-[var(--hairline)] py-10 last:border-b-0"
              >
                <p className="text-[clamp(22px,3vw,32px)] font-normal text-[var(--text)]">
                  <span className="mr-6 inline-block min-w-10 text-[13px] tracking-[0.08em] text-[var(--dim)]">
                    {belief.number}
                  </span>
                  <XsmithsBeliefLine
                    line={belief.line}
                    emphasis={belief.emphasis}
                  />
                </p>
                <p className="mt-4 max-w-[62ch] pl-[52px] text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
                  {belief.detail}
                </p>
                {journalEntry ? (
                  <p className="mt-4 pl-[52px]">
                    <Link
                      href={`${xsmithsSite.basePath}/journal/${journalEntry.slug}`}
                      className={`${touchLink} text-[13px] uppercase tracking-[0.16em] text-[var(--accent)] no-underline transition-opacity duration-[var(--xs-duration-fast,200ms)] hover:opacity-80 ${focusRing}`}
                    >
                      Read in the Journal — {journalEntry.title}
                    </Link>
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      {/* 4 — Manifesto (verbatim closing room) */}
      <section
        aria-labelledby="about-manifesto"
        className="mt-[var(--xs-space-30,120px)] border border-[var(--hairline)] bg-[var(--xs-surface-raised,rgba(255,255,255,0.02))] px-[clamp(24px,5vw,64px)] py-16"
      >
        <h2
          id="about-manifesto"
          className="text-[12px] uppercase tracking-[0.22em] text-[var(--accent)]"
        >
          Manifesto
        </h2>
        <div className="mt-8 max-w-[64ch] space-y-5 text-[var(--xs-type-body,17px)] font-normal leading-relaxed text-[var(--text)]">
          {aboutContent.manifesto.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

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
