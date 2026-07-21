/** Four accent corner brackets — Visual Identity motif from homepage concept. */
export default function XsmithsReticle() {
  const arm =
    "pointer-events-none absolute h-12 w-12 border-[var(--accent)]"

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${arm} left-[5%] top-10 border-l-2 border-t-2`} />
      <span className={`${arm} right-[5%] top-10 border-r-2 border-t-2`} />
      <span className={`${arm} bottom-10 left-[5%] border-b-2 border-l-2`} />
      <span className={`${arm} bottom-10 right-[5%] border-b-2 border-r-2`} />
    </div>
  )
}
