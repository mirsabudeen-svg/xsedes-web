import Link from "next/link"
import { footer } from "@/content/site"

/**
 * Mission-home footer — copyright row + compact wayfinding links.
 * Multi-page SiteFooter stays on other routes via SiteChrome.
 */
const Footer = () => (
  <footer className="relative z-[1] border-t border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[26px] text-[9.5px] font-medium uppercase tracking-[0.2em] text-[var(--faint)]">
    <nav
      aria-label="Site"
      className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2"
    >
      {footer.links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          {link.label}
        </Link>
      ))}
    </nav>
    <div className="flex flex-wrap items-center justify-between gap-5">
      <span>{footer.copyright}</span>
      <span>{footer.tagline}</span>
    </div>
  </footer>
)

export default Footer
