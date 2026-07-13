import { footer } from "@/content/site"

/**
 * Mission-home footer — single hairline-topped row matching the prototype.
 * Multi-page SiteFooter stays on other routes via SiteChrome.
 */
const Footer = () => (
  <footer className="relative z-[1] flex flex-wrap items-center justify-between gap-5 border-t border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[26px] text-[9.5px] font-medium uppercase tracking-[0.2em] text-[var(--faint)]">
    <span>{footer.copyright}</span>
    <span>{footer.tagline}</span>
  </footer>
)

export default Footer
