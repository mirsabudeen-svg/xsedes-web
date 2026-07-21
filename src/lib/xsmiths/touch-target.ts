/**
 * Lighthouse / WCAG 2.5.5 touch targets — use Tailwind utilities so min-height
 * is never dropped by CSS bundling (arbitrary var() fallbacks break in Tailwind v4).
 */
export const touchLink =
  "inline-flex items-center min-h-11 py-2 px-3"

export const touchLinkBlock = "flex items-center min-h-11 py-2 w-full"

export const touchCta =
  "inline-flex min-h-11 items-center border border-[var(--accent)] px-[34px] text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] hover:bg-[var(--accent)] hover:text-[var(--xs-text-inverse,#000)]"
