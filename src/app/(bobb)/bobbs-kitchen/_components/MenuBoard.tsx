import Reveal from "./Reveal";

/* The canonical 10-product line from the BOBB product design playbook.
   Colour coding per brand guidelines §03: gold = clothing/apparel,
   red = footwear, bags and hard goods. */
type MenuItem = {
  num: string;
  name: string;
  note: string;
  line: "clothing" | "accessories";
};

const LEFT: MenuItem[] = [
  { num: "01", name: "T-Shirt", note: "House special", line: "clothing" },
  { num: "02", name: "Accessories", note: "Caps · totes · ask the cook", line: "clothing" },
  { num: "03", name: "Keychain", note: "Quick bite", line: "accessories" },
  { num: "04", name: "Water Bottle", note: "To go", line: "accessories" },
  { num: "05", name: "Phone Case", note: "Made to fit", line: "accessories" },
];

const RIGHT: MenuItem[] = [
  { num: "06", name: "Laptop Skin", note: "Made to fit", line: "accessories" },
  { num: "07", name: "Helmet Sticker", note: "For the ride", line: "accessories" },
  { num: "08", name: "Bag Sticker", note: "Quick bite", line: "accessories" },
  { num: "09", name: "Flip-Flops", note: "Beach order", line: "accessories" },
  { num: "10", name: "Shoes", note: "Slow cooked", line: "accessories" },
];

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3.5 border-b border-smoke/60 py-4 last:border-b-0">
      <span
        className={`font-mono text-[11px] ${
          item.line === "clothing" ? "text-gold" : "text-alert"
        }`}
      >
        {item.num}
      </span>
      <span className="leader text-[16px] font-medium text-bone">
        {item.name}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[1px] text-warmgray">
        {item.note}
      </span>
    </div>
  );
}

export default function MenuBoard() {
  return (
    <section id="menu" className="mx-auto max-w-[1500px] px-[5vw] py-[12vh]">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[2.5px] text-gold">
          01 — The menu
        </p>
        <h2 className="mt-4 font-display text-[clamp(36px,4.5vw,64px)] font-extrabold uppercase leading-[1.05] tracking-[-1.5px]">
          Order anything.
          <br />
          It&apos;s all made to order.
        </h2>
        <p className="mt-5 max-w-[52ch] leading-relaxed text-warmgray">
          No racks. No sizes running out. Everything on the board is cooked
          from your conversation, one piece at a time.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-16">
        <div className="border border-smoke bg-charcoal p-7 md:p-12 lg:p-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-smoke pb-5">
            <span className="font-display text-[22px] font-bold uppercase tracking-[0.5px]">
              Today&apos;s board
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[2px] text-warmgray">
              Served daily · While the van&apos;s parked
            </span>
          </div>
          <div className="grid gap-x-20 md:grid-cols-2">
            <div>
              {LEFT.map((item) => (
                <MenuRow key={item.num} item={item} />
              ))}
            </div>
            <div>
              {RIGHT.map((item) => (
                <MenuRow key={item.num} item={item} />
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-7 border-t border-smoke pt-5 font-mono text-[10px] uppercase tracking-[1.5px] text-warmgray">
            <span className="flex items-center gap-2.5">
              <span className="inline-block size-2.5 bg-gold" aria-hidden="true" />
              Clothing line
            </span>
            <span className="flex items-center gap-2.5">
              <span className="inline-block size-2.5 bg-alert" aria-hidden="true" />
              Accessories line
            </span>
            <span className="ml-auto">Every piece one-of-one</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
