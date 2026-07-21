/**
 * Loading state — Design System §8.9: no spinners, no branded loaders.
 * Static skeleton hairlines hold the page structure so nothing shifts.
 */
export default function XsmithsLoading() {
  return (
    <main
      aria-busy="true"
      className="px-[var(--xs-container-pad,5%)] py-[100px]"
    >
      <span className="sr-only">Loading</span>
      <div aria-hidden="true">
        <div className="h-px w-24 bg-[var(--hairline)]" />
        <div className="mt-14 h-12 max-w-[520px] border-b border-[var(--hairline)]" />
        <div className="mt-10 h-px max-w-[680px] bg-[var(--hairline)]" />
        <div className="mt-6 h-px max-w-[620px] bg-[var(--hairline)]" />
        <div className="mt-6 h-px max-w-[560px] bg-[var(--hairline)]" />
      </div>
    </main>
  )
}
