type CornerMarksProps = {
  className?: string
  /** Pixel size of each corner mark. Prototype default: 18 */
  size?: number
  /** Inset from section edges. Prototype default: 22 */
  inset?: number
}

/**
 * Hairline corner marks — top-left + bottom-right only, matching the
 * canonical prototype `.corners` treatment. Parent must be `relative`.
 */
const CornerMarks = ({
  className = "",
  size = 18,
  inset = 22,
}: CornerMarksProps) => {
  const markStyle = { width: size, height: size } as const
  const insetPx = `${inset}px`

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`.trim()}
    >
      <span
        className="absolute border-l border-t border-[var(--hairline-strong)]"
        style={{ ...markStyle, top: insetPx, left: insetPx }}
      />
      <span
        className="absolute border-b border-r border-[var(--hairline-strong)]"
        style={{ ...markStyle, bottom: insetPx, right: insetPx }}
      />
    </div>
  )
}

export default CornerMarks
