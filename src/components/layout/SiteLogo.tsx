"use client"

import Link from "next/link"
import { site } from "@/content/site"

type SiteLogoProps = {
  className?: string
}

/**
 * Fixed top-left wordmark — always returns to the mission home.
 */
const SiteLogo = ({ className = "" }: SiteLogoProps) => (
  <Link
    href="/"
    aria-label={`${site.name} home`}
    className={`fixed left-[clamp(16px,3vw,40px)] top-[1.25em] z-[60] text-[15px] font-extrabold uppercase tracking-[0.28em] text-[var(--text)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${className}`.trim()}
  >
    {site.name}
    <span className="text-[var(--accent)]">.</span>
  </Link>
)

export default SiteLogo
