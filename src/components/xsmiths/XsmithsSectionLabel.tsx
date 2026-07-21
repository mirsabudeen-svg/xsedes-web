type XsmithsSectionLabelProps = {
  children: string
}

export default function XsmithsSectionLabel({
  children,
}: XsmithsSectionLabelProps) {
  return (
    <div className="mb-14 flex items-center gap-3.5 text-[12px] uppercase tracking-[0.22em] text-[var(--dim)]">
      <span aria-hidden="true" className="h-px w-6 bg-[var(--accent)]" />
      {children}
    </div>
  )
}
