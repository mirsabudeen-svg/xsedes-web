import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <header
      id="top"
      className="mx-auto grid min-h-[82vh] max-w-[1500px] items-center gap-[5vw] px-[5vw] pb-[10vh] pt-[8vh] lg:grid-cols-2"
    >
      <div>
        <Reveal>
          <p className="eyebrow">Kerala&apos;s first AI apparel kitchen</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 font-display text-[clamp(56px,7.2vw,104px)] font-extrabold uppercase leading-[0.98] tracking-[-3px]">
            Let&apos;s
            <br />
            Cook<span className="text-gold">.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 max-w-[44ch] text-[17px] leading-relaxed text-warmgray">
            Walk up. Talk to the machine. Tell it your story — in Malayalam or
            English. Our AI cooks it into{" "}
            <b className="font-medium text-bone">apparel made only for you</b>,
            printed and hand-stitched while you watch.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 font-mono text-[13px] text-bone">
            You order. We cook. You wear it home.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href="#taste"
              className="bg-gold px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-void transition-colors hover:bg-golddim"
            >
              Talk to the cook
            </a>
            <a
              href="#menu"
              className="border-b border-smoke pb-1 font-mono text-[12px] uppercase tracking-[1px] text-warmgray transition-colors hover:border-warmgray hover:text-bone"
            >
              See the menu
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal delay={200}>
        <figure className="relative">
          <Image
            src="/bobb/van-lets-cook.png"
            alt="The BOBB's Kitchen van — matte black with a hand-drawn gold pattern wrap and 'let's cook' painted under the wordmark"
            width={2774}
            height={1504}
            priority
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="w-full border border-smoke"
          />
          <figcaption className="absolute -bottom-px -left-px border border-smoke bg-void px-5 py-3.5 font-mono text-[10px] uppercase tracking-[1.5px] text-warmgray">
            <span className="flex items-center gap-2 font-bold text-gold">
              <span className="live-dot" aria-hidden="true" />
              Now serving
            </span>
            Kannur University campus
          </figcaption>
        </figure>
      </Reveal>
    </header>
  );
}
