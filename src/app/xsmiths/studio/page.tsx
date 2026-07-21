import type { Metadata } from "next"
import Link from "next/link"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import { studioContent, xsmithsSite, xsmithsUrl } from "@/content/xsmiths"

export const metadata: Metadata = {
  title: "Studio",
  description:
    "How XSMITHS works — one experience engineering team, an eight-stage method, and a craft culture built on reliability.",
  alternates: { canonical: xsmithsUrl("/studio") },
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

/**
 * Studio — method + craft culture (IA §4.4). Arc:
 * Threshold → Understanding (method timeline) → Doctrine (culture) →
 * Conversation.
 */
export default function StudioPage() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ Studio</XsmithsSectionLabel>
      <h1 className="max-w-[14ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        {studioContent.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        {studioContent.lede}
      </p>

      {/* Method — eight-stage timeline (Content system: Timeline). */}
      <section
        className="mt-20 border-t border-[var(--hairline)] pt-16"
        aria-label="Method"
      >
        <h2 className="text-[var(--xs-type-heading-md,clamp(24px,3vw,36px))] font-semibold tracking-[0.02em]">
          {studioContent.methodTitle}
        </h2>
        <p className="mt-5 max-w-[62ch] text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
          {studioContent.methodLede}
        </p>
        <ol className="mt-12 max-w-[var(--xs-container-standard,900px)]">
          {studioContent.method.map((stage) => (
            <li
              key={stage.number}
              className="flex items-baseline gap-8 border-b border-[var(--hairline)] py-6 last:border-b-0"
            >
              <span className="min-w-10 text-[13px] tracking-[0.08em] text-[var(--dim)]">
                {stage.number}
              </span>
              <div>
                <h3 className="text-[var(--xs-type-title,22px)] font-semibold tracking-[0.04em] text-[var(--text)]">
                  {stage.name}
                </h3>
                <p className="mt-2 max-w-[58ch] text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
                  {stage.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Craft culture. */}
      <section
        className="mt-20 border-t border-[var(--hairline)] pt-16"
        aria-label="Craft culture"
      >
        <h2 className="text-[var(--xs-type-heading-md,clamp(24px,3vw,36px))] font-semibold tracking-[0.02em]">
          {studioContent.cultureTitle}
        </h2>
        <div className="mt-10 grid max-w-[var(--xs-container-wide,1100px)] grid-cols-1 gap-12 md:grid-cols-2">
          {studioContent.culture.map((value) => (
            <article
              key={value.name}
              className="border-t-2 border-[var(--accent)] pt-6"
            >
              <h3 className="text-[var(--xs-type-title,22px)] font-semibold text-[var(--text)]">
                {value.name}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
                {value.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-20 flex flex-wrap items-center gap-6 border-t border-[var(--hairline)] pt-12">
        <Link
          href={`${xsmithsSite.basePath}/services`}
          className={`text-[12px] uppercase tracking-[0.18em] text-[var(--dim)] no-underline hover:text-[var(--accent)] ${focusRing}`}
        >
          Services
        </Link>
        <Link
          href={`${xsmithsSite.basePath}/contact`}
          className={`text-[12px] uppercase tracking-[0.18em] text-[var(--accent)] no-underline hover:opacity-80 ${focusRing}`}
        >
          Begin a conversation
        </Link>
      </div>
    </XsmithsMain>
  )
}
