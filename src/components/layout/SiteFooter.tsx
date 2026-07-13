import Link from "next/link"
import SectionLabel from "@/components/ui/SectionLabel"
import { brandDirectory } from "@/content/brand-directory"
import { divisions } from "@/content/divisions"
import { footer, site } from "@/content/site"

/**
 * Site-wide footer — ported from website/src/components/SiteFooter.astro.
 * Server component (no interactivity), rendered in-flow at the end of the
 * content column so it never competes with the fixed rail/bar layers.
 */
const SiteFooter = () => (
  <footer className="border-t border-[var(--hairline)] px-[clamp(20px,5vw,48px)] py-[clamp(48px,8vw,88px)]">
    <SectionLabel>§ 09 · CONTACT</SectionLabel>

    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
      <div>
        <p className="text-[15px] font-extrabold uppercase tracking-[0.2em] text-[var(--text)]">
          {site.name}
        </p>
        <p className="mt-2 text-[13px] text-[var(--dim)]">{footer.tagline}</p>
      </div>

      <div>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
          Divisions
        </p>
        <ul className="flex list-none flex-col gap-2.5">
          {divisions.map((d) => (
            <li key={d.id}>
              <Link
                href={`/divisions/${d.id}`}
                className="text-[13px] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
              >
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
          Brands
        </p>
        <ul className="flex list-none flex-col gap-2.5">
          {brandDirectory.map((b) => (
            <li key={b.slug}>
              <a
                href={`/${b.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
              >
                {b.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
          Company
        </p>
        <ul className="flex list-none flex-col gap-2.5">
          <li>
            <Link
              href="/about"
              className="text-[13px] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/careers"
              className="text-[13px] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
            >
              Careers
            </Link>
          </li>
          <li>
            <Link
              href="/work"
              className="text-[13px] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-[13px] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
          Legal
        </p>
        <ul className="flex list-none flex-col gap-2.5">
          <li>
            <Link
              href="/legal/privacy"
              className="text-[13px] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              href="/legal/terms"
              className="text-[13px] text-[var(--dim)] no-underline transition-colors duration-300 ease-[var(--ease)] hover:text-[var(--accent)]"
            >
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-14 border-t border-[var(--hairline)] pt-6 text-[11px] text-[var(--faint)]">
      {footer.copyright}
    </div>
  </footer>
)

export default SiteFooter
