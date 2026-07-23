import Reveal from "./Reveal";

const STEPS = [
  {
    tag: "STEP 01 / ORDER",
    title: "Talk",
    body: (
      <>
        Step up to the kiosk. Tell the cook a memory, a joke, a person, a
        place — <b className="font-medium text-bone">in Malayalam or English</b>.
        Pick what it goes on.
      </>
    ),
    time: "Takes: as long as your story",
  },
  {
    tag: "STEP 02 / COOK",
    title: "Create",
    body: (
      <>
        The AI turns your words into artwork, live on screen. Not from a
        template — <b className="font-medium text-bone">from you</b>. Don&apos;t
        like it? Send it back. It&apos;s your kitchen.
      </>
    ),
    time: "Takes: 25 seconds a serving",
  },
  {
    tag: "STEP 03 / SERVE",
    title: "Wear",
    body: (
      <>
        You confirm. We print. Hand-stitched finish, your name on the tag.{" "}
        <b className="font-medium text-bone">This one&apos;s yours.</b>
      </>
    ),
    time: "Takes: hot off the press",
  },
];

export default function HowWeCook() {
  return (
    <section id="cook" className="mx-auto max-w-[1500px] px-[5vw] py-[12vh]">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[2.5px] text-gold">
          02 — How we cook
        </p>
        <h2 className="mt-4 font-display text-[clamp(36px,4.5vw,64px)] font-extrabold uppercase leading-[1.05] tracking-[-1.5px]">
          Three steps.
          <br />
          One conversation.
        </h2>
        <p className="mt-5 max-w-[52ch] leading-relaxed text-warmgray">
          There&apos;s a tablet at the counter. Behind it, the BOBB agent — our
          cook. It listens before it makes anything.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-px border border-smoke bg-smoke md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.tag} delay={i * 120} className="bg-void">
            <div className="h-full p-8 lg:p-12">
              <span className="font-mono text-[11px] tracking-[2px] text-gold">
                {step.tag}
              </span>
              <h3 className="mt-5 font-display text-[26px] font-bold uppercase tracking-[-0.5px]">
                {step.title}
              </h3>
              <p className="mt-3.5 text-[15px] leading-relaxed text-warmgray">
                {step.body}
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[1.5px] text-gold">
                {step.time}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
