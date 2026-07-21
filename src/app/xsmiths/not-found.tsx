import Link from "next/link"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import { xsmithsSite } from "@/content/xsmiths"

/** Missing room — calm recovery, no blame, clear wayfinding (DS §8.9). */
export default function XsmithsNotFound() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ 404</XsmithsSectionLabel>
      <h1 className="max-w-[16ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        This room doesn&apos;t exist
      </h1>
      <p className="mt-6 max-w-[52ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        The page you&apos;re looking for isn&apos;t part of the XSMITHS
        exhibition. The galleries below are.
      </p>
      <div className="mt-10 flex flex-wrap gap-6">
        <Link
          href={xsmithsSite.basePath}
          className="text-[12px] uppercase tracking-[0.18em] text-[var(--accent)] no-underline hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Home
        </Link>
        <Link
          href={`${xsmithsSite.basePath}/products`}
          className="text-[12px] uppercase tracking-[0.18em] text-[var(--dim)] no-underline hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Products
        </Link>
        <Link
          href={`${xsmithsSite.basePath}/contact`}
          className="text-[12px] uppercase tracking-[0.18em] text-[var(--dim)] no-underline hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Contact
        </Link>
      </div>
    </XsmithsMain>
  )
}
