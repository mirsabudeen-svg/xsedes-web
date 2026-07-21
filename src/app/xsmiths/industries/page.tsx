import type { Metadata } from "next"
import Link from "next/link"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import { industryLenses, xsmithsSite, xsmithsUrl } from "@/content/xsmiths"

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Where XSMITHS systems live — museums, retail, hospitality, corporate, government, education, entertainment, healthcare, and transport.",
  alternates: { canonical: xsmithsUrl("/industries") },
}

/**
 * Industries — persona lenses (IA Part 14). Lenses filter the universal
 * spine; they never duplicate it. Gallery grid of doors, museum-wall style.
 */
export default function IndustriesPage() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ Industries</XsmithsSectionLabel>
      <h1 className="max-w-[18ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        Where the systems live
      </h1>
      <p className="mt-6 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        The engineering is universal — the constraints are not. Each industry
        lens shows which product families carry the most weight in that
        environment, and what the systems are engineered to survive there.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-px border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-3">
        {industryLenses.map((lens) => (
          <Link
            key={lens.slug}
            href={`${xsmithsSite.basePath}/industries/${lens.slug}`}
            className="group flex min-h-[200px] flex-col justify-between bg-[var(--ink)] px-7 py-9 no-underline transition-colors duration-[var(--xs-duration-ui,250ms)] hover:bg-[var(--xs-surface-hover,rgba(255,255,255,0.03))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
          >
            <div>
              <h2 className="text-[var(--xs-type-title,22px)] font-semibold tracking-[0.04em] text-[var(--text)] transition-colors duration-[var(--xs-duration-fast,200ms)] group-hover:text-[var(--accent)]">
                {lens.name}
              </h2>
              <p className="mt-3 text-[14px] font-light leading-relaxed text-[var(--dim)]">
                {lens.elevator}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </XsmithsMain>
  )
}
