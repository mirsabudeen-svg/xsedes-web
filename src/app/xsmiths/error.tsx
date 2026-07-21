"use client"

import { useEffect } from "react"
import Link from "next/link"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import { xsmithsSite } from "@/content/xsmiths"

type XsmithsErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

/** Route error boundary — fails quietly, explains recovery calmly. */
export default function XsmithsError({ error, reset }: XsmithsErrorProps) {
  useEffect(() => {
    console.error("[xsmiths] route error:", error)
  }, [error])

  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ System</XsmithsSectionLabel>
      <h1 className="max-w-[18ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        Something didn&apos;t respond
      </h1>
      <p className="mt-6 max-w-[52ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        This section failed to load. You can try again, or continue to another
        part of the site — nothing else is affected.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-[var(--xs-size-touch-min,44px)] items-center border border-[var(--accent)] bg-[var(--accent)] px-[34px] text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--xs-text-inverse,#000)] transition-opacity duration-[var(--xs-duration-fast,200ms)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Try again
        </button>
        <Link
          href={xsmithsSite.basePath}
          className="text-[12px] uppercase tracking-[0.18em] text-[var(--dim)] no-underline hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Back to home
        </Link>
      </div>
    </XsmithsMain>
  )
}
