type SectionLabelProps = {
  children: string
  cleared?: boolean
  className?: string
}

/**
 * Mono-caps section eyebrow: "§ 0N · LABEL" with optional cleared tick.
 * Copy must be passed from src/content — do not hardcode labels here.
 */
const SectionLabel = ({
  children,
  cleared = false,
  className = "",
}: SectionLabelProps) => (
  <div
    className={`mb-8 flex items-center gap-3.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--dim)] ${className}`.trim()}
  >
    <span>{children}</span>
    <span
      aria-hidden="true"
      className={`text-[var(--accent)] transition-opacity duration-[600ms] ease-[var(--ease)] ${
        cleared ? "opacity-100" : "opacity-0"
      }`}
    >
      ✓
    </span>
    <span
      aria-hidden="true"
      className="h-px w-16 shrink-0 bg-[var(--hairline-strong)]"
    />
  </div>
)

export default SectionLabel
