import type { MDXComponents } from "mdx/types"
import Link from "next/link"

/**
 * Global MDX element mapping — editorial typography per XSMITHS Design
 * System §4 (body 17px light, 68ch measure, relaxed leading; headings
 * sentence-case inside long-form content). Consumed by journal bodies.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-14 text-[var(--xs-type-heading-md,24px)] font-semibold tracking-[0.01em] text-[var(--text)]"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mt-6 max-w-[68ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mt-6 max-w-[68ch] list-none space-y-3 border-l border-[var(--hairline)] pl-6 text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mt-6 max-w-[68ch] list-decimal space-y-3 pl-6 text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]"
        {...props}
      />
    ),
    li: (props) => <li {...props} />,
    strong: (props) => (
      <strong className="font-semibold text-[var(--text)]" {...props} />
    ),
    em: (props) => (
      <em
        className="font-[family-name:var(--font-xsmiths-accent)] italic"
        {...props}
      />
    ),
    a: ({ href = "", children, ...rest }) => (
      <Link
        href={href}
        className="text-[var(--text)] underline decoration-[var(--xs-accent-muted,rgba(78,242,211,0.3))] underline-offset-4 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        {...rest}
      >
        {children}
      </Link>
    ),
    ...components,
  }
}
