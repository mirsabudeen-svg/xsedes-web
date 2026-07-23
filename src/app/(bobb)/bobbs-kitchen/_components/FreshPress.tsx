import Image from "next/image";
import Reveal from "./Reveal";

const SERVINGS = [
  {
    src: "/bobb/tee-king-card.png",
    alt: "White oversized t-shirt on a hanger with a king playing-card artwork printed on the back",
    name: "The King Card",
    meta: "Tee · No. 01",
    w: 1080,
    h: 1350,
  },
  {
    src: "/bobb/tee-ancient-badass.png",
    alt: "Black t-shirt with a retro illustration of a mundu-wearing uncle on a skateboard and the words 'Ancient Badass'",
    name: "Ancient Badass",
    meta: "Tee · No. 01",
    w: 1080,
    h: 1350,
  },
  {
    src: "/bobb/art-ammachi-card.png",
    alt: "Queen playing-card artwork of an ammachi in a kasavu saree holding a brass lamp, titled 'Ammachi'",
    name: "Queen Ammachi",
    meta: "Artwork · from one story",
    w: 832,
    h: 1248,
  },
  {
    src: "/bobb/chain-worn.png",
    alt: "Close-up of a silver chain worn over a black t-shirt, photographed in warm low light",
    name: "The Chain",
    meta: "Accessories · No. 02",
    w: 1080,
    h: 1350,
  },
];

export default function FreshPress() {
  return (
    <section className="mx-auto max-w-[1500px] px-[5vw] py-[12vh]">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[2.5px] text-gold">
          04 — Fresh off the press
        </p>
        <h2 className="mt-4 font-display text-[clamp(36px,4.5vw,64px)] font-extrabold uppercase leading-[1.05] tracking-[-1.5px]">
          Cooked recently.
        </h2>
        <p className="mt-5 max-w-[52ch] leading-relaxed text-warmgray">
          Every one of these started as somebody talking. Not mass-produced.
          Just them.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {SERVINGS.map((item, i) => (
          <Reveal key={item.name} delay={i * 100}>
            <figure className="border border-smoke">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.w}
                height={item.h}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                className="w-full"
              />
              <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-smoke px-4 py-3.5">
                <span className="text-[14px] font-medium text-bone">
                  {item.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-warmgray">
                  {item.meta}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
