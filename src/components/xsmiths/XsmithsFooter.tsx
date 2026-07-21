"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import XsmithsAccent from "@/components/xsmiths/XsmithsAccent"
import { homeCta, xsmithsFooterNav, xsmithsSite } from "@/content/xsmiths"
import { touchCta, touchLink } from "@/lib/xsmiths/touch-target"

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

/**
 * Footer — Scene 05 Invitation (IA Part 7): poetic CTA line (hidden on
 * Contact, where it is redundant), full sitemap, venture attribution.
 */
export default function XsmithsFooter() {
  const pathname = usePathname()
  const showCta = pathname !== `${xsmithsSite.basePath}/contact`

  return (
    <footer className="border-t border-[var(--hairline)] px-[var(--xs-container-pad,5%)] pb-10 pt-[var(--xs-space-20,80px)] text-center">
      {showCta ? (
        <p className="mb-4 text-[clamp(28px,4vw,44px)] font-normal text-[var(--text)]">
          {homeCta.lineBefore}
          <XsmithsAccent>{homeCta.lineAccent}</XsmithsAccent>
          {homeCta.lineAfter}
        </p>
      ) : null}
      {showCta ? (
        <Link
          href={`${xsmithsSite.basePath}/contact`}
          className={`mb-14 ${touchCta} ${focusRing}`}
        >
          Begin a conversation
        </Link>
      ) : null}

      <nav aria-label="XSMITHS sitemap">
        <ul className="mb-14 flex flex-wrap items-center justify-center gap-2">
          {xsmithsFooterNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${touchLink} text-[13px] tracking-[0.08em] text-[var(--dim)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--dim)]">
        {xsmithsSite.venturePrefix}{" "}
        <Link
          href={xsmithsSite.parentHref}
          className={`${touchLink} text-[12px] uppercase tracking-[0.22em] text-[var(--dim)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
        >
          {xsmithsSite.parentName}
        </Link>
        {" — "}
        <Link
          href={xsmithsSite.basePath}
          className={`${touchLink} text-[12px] uppercase tracking-[0.22em] text-[var(--dim)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] ${focusRing}`}
        >
          xsedes.com/xsmiths
        </Link>
      </p>
    </footer>
  )
}
