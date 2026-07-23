import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-smoke bg-void/90 px-[5vw] py-5 backdrop-blur-sm">
      <Link href="#top" className="leading-none no-underline">
        <span className="font-display text-xl font-extrabold tracking-wide text-bone">
          BOBB<span className="text-gold">&apos;S KITCHEN</span>
        </span>
        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[2.5px] text-warmgray">
          Made from your words
        </span>
      </Link>
      <div className="flex items-center gap-9">
        <a
          href="#menu"
          className="hidden font-mono text-[11px] uppercase tracking-[1.5px] text-warmgray transition-colors hover:text-bone md:block"
        >
          The menu
        </a>
        <a
          href="#cook"
          className="hidden font-mono text-[11px] uppercase tracking-[1.5px] text-warmgray transition-colors hover:text-bone md:block"
        >
          How we cook
        </a>
        <a
          href="#kitchen"
          className="hidden font-mono text-[11px] uppercase tracking-[1.5px] text-warmgray transition-colors hover:text-bone md:block"
        >
          The kitchen
        </a>
        <a
          href="#taste"
          className="bg-gold px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-void transition-colors hover:bg-golddim"
        >
          Try the cook
        </a>
      </div>
    </nav>
  );
}
