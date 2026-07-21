import type { Metadata } from "next"
import Link from "next/link"
import ProductFamilyGrid from "@/components/xsmiths/ProductFamilyGrid"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import {
  aboutContent,
  productsOverview,
  xsmithsSite,
} from "@/content/xsmiths"
import { xsmithsPageMetadata } from "@/lib/xsmiths/metadata"
import { touchCta } from "@/lib/xsmiths/touch-target"

export const metadata: Metadata = xsmithsPageMetadata(
  "Products",
  "Nine XSMITHS product families for interactive and immersive experience engineering.",
  "/products",
)

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

/**
 * Products overview (IA §8.3):
 * Threshold → PhotoShap clarification → nine doors → optional conversation.
 */
export default function ProductsPage() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ Products</XsmithsSectionLabel>
      <h1 className="max-w-[18ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        {productsOverview.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        {productsOverview.lede}
      </p>

      <p className="mt-8 max-w-[62ch] border-l-2 border-[var(--accent)] pl-6 text-[var(--xs-type-body-sm,15px)] font-light leading-relaxed text-[var(--dim)]">
        {aboutContent.photoshapNote}
      </p>

      <div className="mt-16">
        <ProductFamilyGrid />
      </div>

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
