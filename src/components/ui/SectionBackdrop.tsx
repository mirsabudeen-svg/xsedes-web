type SectionBackdropProps = {
  /** Large faint glyph shown behind section content */
  mark?: string
  className?: string
}

/**
 * Oversized section watermark — mechanical depth without cards/shadows.
 */
const SectionBackdrop = ({ mark = "§", className = "" }: SectionBackdropProps) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
  >
    <span className="absolute -right-4 top-10 select-none text-[clamp(120px,22vw,280px)] font-extrabold leading-none tracking-[-0.06em] text-white/[0.028]">
      {mark}
    </span>
    <div
      className="absolute bottom-0 left-0 right-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(78,242,211,0.18), transparent)",
      }}
    />
  </div>
)

export default SectionBackdrop
