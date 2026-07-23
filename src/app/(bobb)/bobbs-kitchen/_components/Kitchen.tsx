import Image from "next/image";
import Reveal from "./Reveal";

const CARDS = [
  {
    src: "/bobb/van-blackout.png",
    alt: "The BOBB van in matte black with the white and gold BOBB wordmark and 'Made from your words' livery",
    name: "Kitchen Unit 02 — Blackout",
    meta: "Events & bookings",
    w: 2774,
    h: 1504,
  },
  {
    src: "/bobb/van-kannur-road.png",
    alt: "The BOBB Kitchen van driving past palm-lined buildings in Kannur, black with gold window trim",
    name: "On the road, Kannur",
    meta: "Campus circuit",
    w: 2774,
    h: 1504,
  },
  {
    src: "/bobb/kitchen-window.png",
    alt: "The van's serving window: two tablets running the BOBB Kitchen design interface with a folded black tee on the steel counter",
    name: "The counter",
    meta: "Order here",
    w: 1536,
    h: 1024,
  },
  {
    src: "/bobb/kitchen-interior.png",
    alt: "Inside the van: warm-lit black cabinetry, printer and heat press at the production bench",
    name: "The galley",
    meta: "Print & press",
    w: 1536,
    h: 1024,
  },
  {
    src: "/bobb/photo-storefront.jpeg",
    alt: "A BOBB corner shop in a Kerala village at dusk, warm gold shelves glowing, a man in a mundu and BOBB cap sitting outside beside a wall reading 'Kerala Streets to the World'",
    name: "The fixed kitchen",
    meta: "Kerala streets to the world",
    w: 1345,
    h: 784,
  },
  {
    src: "/bobb/photo-cap-kannur.jpeg",
    alt: "A man on a tree-lined Kannur lane holding out a black BOBB cap with both hands",
    name: "First servings",
    meta: "Kannur, worn everywhere",
    w: 694,
    h: 1051,
  },
];

export default function Kitchen() {
  return (
    <section id="kitchen" className="mx-auto max-w-[1500px] px-[5vw] py-[12vh]">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[2.5px] text-gold">
          05 — The kitchen
        </p>
        <h2 className="mt-4 font-display text-[clamp(36px,4.5vw,64px)] font-extrabold uppercase leading-[1.05] tracking-[-1.5px]">
          A kitchen on wheels.
        </h2>
        <p className="mt-5 max-w-[52ch] leading-relaxed text-warmgray">
          It looks like a food truck because it works like one. Order at the
          window, watch it get made, walk away wearing it.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {CARDS.map((card, i) => (
          <Reveal key={card.name} delay={(i % 2) * 100}>
            <figure className="border border-smoke">
              <Image
                src={card.src}
                alt={card.alt}
                width={card.w}
                height={card.h}
                sizes="(max-width: 768px) 90vw, 45vw"
                className="w-full"
              />
              <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-smoke px-5 py-4">
                <span className="text-[15px] font-medium text-bone">
                  {card.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-warmgray">
                  {card.meta}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <figure className="border border-smoke">
          <Image
            src="/bobb/kitchen-floorplan.png"
            alt="Top-down technical floor plan of the van: Zone 1 customer interface with two serving-window tablets, Zone 2 AI workstation, Zone 3 production with DTF printer, prep area and heat press"
            width={1024}
            height={1536}
            sizes="(max-width: 768px) 90vw, 70vw"
            className="mx-auto w-full max-w-[820px]"
          />
          <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-smoke px-5 py-4">
            <span className="text-[15px] font-medium text-bone">
              The line, drawn to scale
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-warmgray">
              Zone 01 order · Zone 02 cook · Zone 03 serve
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
