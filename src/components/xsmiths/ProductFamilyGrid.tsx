import Link from "next/link"
import { productFamilies, xsmithsSite } from "@/content/xsmiths"

const productHref = (slug: string) =>
  `${xsmithsSite.basePath}/products/${slug}`

/**
 * Shared nine-family gallery — single source for Home Scene 03 and
 * Products overview (IA §8.3) so name, number, and focus never drift.
 */
export default function ProductFamilyGrid() {
  return (
    <div className="mx-auto grid max-w-[var(--xs-container-wide,1100px)] grid-cols-1 gap-px border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-3">
      {productFamilies.map((family) => (
        <Link
          key={family.slug}
          href={productHref(family.slug)}
          className="group flex min-h-[200px] flex-col justify-between bg-[var(--ink)] px-7 py-9 no-underline transition-colors duration-[var(--xs-duration-ui,250ms)] hover:bg-[var(--xs-surface-hover,rgba(255,255,255,0.03))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
        >
          <div>
            <span className="text-[12px] tracking-[0.16em] text-[var(--dim)]">
              {family.number}
            </span>
            <h2 className="mt-[18px] text-[var(--xs-type-title,22px)] font-semibold tracking-[0.06em] text-[var(--text)] transition-colors duration-[var(--xs-duration-fast,200ms)] group-hover:text-[var(--accent)]">
              {family.name}
            </h2>
            <p className="mt-2.5 text-[14px] font-light leading-relaxed text-[var(--dim)]">
              {family.focus}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
