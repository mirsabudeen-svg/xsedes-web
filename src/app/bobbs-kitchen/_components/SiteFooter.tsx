import Image from "next/image";

export default function SiteFooter() {
  return (
    <>
      <div id="find" className="border-t border-smoke px-[5vw] py-[14vh] text-center">
        <h2 className="font-display text-[clamp(48px,7vw,100px)] font-extrabold uppercase leading-none tracking-[-2px]">
          Hungry<span className="text-gold">?</span>
        </h2>
        <p className="mt-6 font-mono text-[13px] text-warmgray">
          The van&apos;s parked somewhere in Kannur right now.
        </p>
        <a
          href="https://www.instagram.com/"
          className="mt-11 inline-block bg-gold px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-void transition-colors hover:bg-golddim"
        >
          Find the van
        </a>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-smoke px-[5vw] py-8">
        <Image
          src="/bobb/logo-gridmark.png"
          alt="BOBB grid monogram — the four letters stacked two by two, final B in gold"
          width={160}
          height={160}
          className="size-20"
        />
        <p className="font-mono text-[10px] uppercase tracking-[2px] text-warmgray">
          Made from your words · Made in Kannur. Worn everywhere.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[2px] text-warmgray">
          <a
            href="https://www.xsedes.com"
            className="transition-colors hover:text-bone"
          >
            An XSEDES venture ↗
          </a>
          <span className="mx-3 text-smoke">|</span>© 2026 BOBB
        </p>
      </footer>
    </>
  );
}
