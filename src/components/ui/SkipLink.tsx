/**
 * First focusable control — jumps past chrome into main content.
 */
const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:border focus:border-[var(--accent)] focus:bg-[var(--ink)] focus:px-4 focus:py-3 focus:text-[11px] focus:font-bold focus:uppercase focus:tracking-[0.22em] focus:text-[var(--accent)] focus:outline-none"
  >
    Skip to content
  </a>
)

export default SkipLink
