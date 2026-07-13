"use client"

import Link from "next/link"
import { useState } from "react"
import { divisions } from "@/content/divisions"
import { site } from "@/content/site"

/**
 * Site-wide top nav — ported from website/src/components/SiteHeader.astro.
 * Distinct from MissionRail (the homepage scroll-stage telemetry rail):
 * this is page-to-page wayfinding for /about, /brands, /careers, /contact,
 * /work and the /divisions/[slug] routes. Rendered in-flow (not fixed/
 * sticky) so it never fights the rail's or MissionBar's fixed z-50 layers,
 * and sits outside the boot-gate's overlay stack.
 */
const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [divisionsOpen, setDivisionsOpen] = useState(false)

  return (
    <header className="relative z-10 flex items-center justify-between border-b border-[var(--hairline)] px-[clamp(20px,5vw,48px)] py-5">
      <Link
        href="/"
        className="text-[15px] font-extrabold uppercase tracking-[0.28em] text-[var(--text)] no-underline"
      >
        {site.name}
        <span className="text-[var(--accent)]">.</span>
      </Link>

      <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
        <div
          className="relative"
          onMouseEnter={() => setDivisionsOpen(true)}
          onMouseLeave={() => setDivisionsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setDivisionsOpen((v) => !v)}
            aria-expanded={divisionsOpen}
            className="flex items-center gap-1.5 bg-transparent text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
          >
            Divisions
          </button>
          <ul
            className={`absolute left-0 top-full mt-2 min-w-[180px] list-none border border-[var(--hairline)] bg-[var(--ink)] p-2 ${
              divisionsOpen ? "flex flex-col" : "hidden"
            }`}
          >
            {divisions.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/divisions/${d.id}`}
                  className="block px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/work"
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
        >
          Work
        </Link>
        <Link
          href="/brands"
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
        >
          Brands
        </Link>
        <Link
          href="/about"
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
        >
          Contact
        </Link>
      </nav>

      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-label="Toggle menu"
        className="border border-[var(--hairline-strong)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--dim)] md:hidden"
      >
        {mobileOpen ? "Close" : "Menu"}
      </button>

      {mobileOpen && (
        <nav
          aria-label="Primary mobile"
          className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-[var(--hairline)] bg-[var(--ink)] px-[clamp(20px,5vw,48px)] py-4 md:hidden"
        >
          {divisions.map((d) => (
            <Link
              key={d.id}
              href={`/divisions/${d.id}`}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
            >
              {d.name}
            </Link>
          ))}
          <Link
            href="/work"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
          >
            Work
          </Link>
          <Link
            href="/brands"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
          >
            Brands
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  )
}

export default SiteHeader
