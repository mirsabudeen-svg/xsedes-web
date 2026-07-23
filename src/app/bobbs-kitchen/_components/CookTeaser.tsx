"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

/* A simulated taste of the in-store kiosk agent. Personality mirrors the
   BOBB Gemini master system prompt: warm, calm, under 25 words, Malayalam/
   Manglish sprinkled in, never pushy, never hype. No real model is called —
   the artwork is a deterministic gold doodle seeded by the visitor's story,
   in the same line-language as the van wrap. */

const ACKS = [
  "Good one. Let me taste it.",
  "That's a story. Give me a second with it.",
  "Kollam. I can work with this.",
  "Heard you. Cooking something only you could wear.",
];

const SAMPLES = [
  "Ammachi's brass lamp, lit every evening at six",
  "Monsoon cricket on the terrace with my cousins",
  "First bike. Payyambalam beach. 6 AM.",
];

const STOPWORDS = new Set(
  "a an the and or but with for from this that those these of in on at to my our your his her its was were is are be been i we you they it me us them so very just really every each all some what when where which while who would could should will did does doing had has have not about into over under again once more most other such than too now then there here".split(
    " ",
  ),
);

function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function extractKeywords(story: string): string[] {
  const words = story
    .split(/[^\p{L}0-9']+/u)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w.toLowerCase()));
  const unique: string[] = [];
  for (const w of words) {
    const upper = w.toUpperCase();
    if (!unique.includes(upper)) unique.push(upper);
  }
  return unique.sort((a, b) => b.length - a.length).slice(0, 4);
}

/* One doodle stroke per grid cell, in the hand-drawn line-language of the
   van wrap. Deterministic: same story, same shirt. */
function DoodleArt({ seed }: { seed: number }) {
  const rng = mulberry32(seed);
  const cells: React.ReactNode[] = [];
  const cols = 4;
  const rows = 6;
  const x0 = 108;
  const y0 = 112;
  const cw = 21;
  const ch = 21;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x0 + c * cw + cw / 2;
      const cy = y0 + r * ch + ch / 2;
      const s = 7;
      const motif = Math.floor(rng() * 7);
      const color = rng() > 0.3 ? "#C4A545" : "#9E8538";
      const key = `${r}-${c}`;
      const common = {
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: "round" as const,
        fill: "none",
      };
      switch (motif) {
        case 0: // quarter arc
          cells.push(
            <path
              key={key}
              d={`M ${cx - s} ${cy} A ${s} ${s} 0 0 1 ${cx} ${cy - s}`}
              {...common}
            />,
          );
          break;
        case 1: // diagonal
          cells.push(
            <line key={key} x1={cx - s} y1={cy + s} x2={cx + s} y2={cy - s} {...common} />,
          );
          break;
        case 2: // corner
          cells.push(
            <path
              key={key}
              d={`M ${cx - s} ${cy - s} L ${cx + s} ${cy - s} L ${cx + s} ${cy + s}`}
              {...common}
            />,
          );
          break;
        case 3: // dot
          cells.push(<circle key={key} cx={cx} cy={cy} r={2.4} fill={color} />);
          break;
        case 4: // zigzag
          cells.push(
            <path
              key={key}
              d={`M ${cx - s} ${cy + s / 2} L ${cx - s / 3} ${cy - s / 2} L ${cx + s / 3} ${cy + s / 2} L ${cx + s} ${cy - s / 2}`}
              {...common}
            />,
          );
          break;
        case 5: // circle
          cells.push(<circle key={key} cx={cx} cy={cy} r={s * 0.8} {...common} />);
          break;
        default: // T-junction
          cells.push(
            <path
              key={key}
              d={`M ${cx - s} ${cy} L ${cx + s} ${cy} M ${cx} ${cy} L ${cx} ${cy + s}`}
              {...common}
            />,
          );
      }
    }
  }

  return (
    <svg
      viewBox="0 0 300 340"
      role="img"
      aria-label="Preview of a black t-shirt with a generated gold line-art pattern cooked from your story"
      className="mx-auto w-full max-w-[300px]"
    >
      {/* tee silhouette */}
      <path
        d="M150 42 C136 42 122 46 113 52 L62 76 C54 80 52 88 56 96 L75 131 C78 137 85 139 91 136 L104 129 L104 290 C104 296 109 301 115 301 L185 301 C191 301 196 296 196 290 L196 129 L209 136 C215 139 222 137 225 131 L244 96 C248 88 246 80 238 76 L187 52 C178 46 164 42 150 42 Z"
        fill="#1E1E1E"
        stroke="#3A3835"
        strokeWidth="1"
      />
      <path
        d="M132 44 C138 52 162 52 168 44"
        fill="none"
        stroke="#3A3835"
        strokeWidth="2"
      />
      {cells}
      {/* story-seam tag */}
      <rect x={168} y={278} width={24} height={12} fill="none" stroke="#9E8538" strokeWidth="1" />
      <text
        x={180}
        y={287}
        textAnchor="middle"
        fontSize="7"
        fill="#C4A545"
        fontFamily="var(--font-space-mono), monospace"
      >
        BOBB
      </text>
    </svg>
  );
}

type Phase = "idle" | "listening" | "reading" | "cooking" | "ready";

export default function CookTeaser() {
  const [story, setStory] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [seed, setSeed] = useState(0);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [ack, setAck] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const schedule = (fn: () => void, ms: number, instant: boolean) => {
    if (instant) fn();
    else timers.current.push(setTimeout(fn, ms));
  };

  const cookIt = () => {
    const text = story.trim();
    if (!text || (phase !== "idle" && phase !== "ready")) return;
    const s = hash(text);
    const instant =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setSeed(s);
    setAck(ACKS[s % ACKS.length]);
    setKeywords(extractKeywords(text));
    setPhase("listening");
    schedule(() => setPhase("reading"), 700, instant);
    schedule(() => setPhase("cooking"), 1500, instant);
    schedule(() => setPhase("ready"), 4100, instant);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStory("");
    setPhase("idle");
    setKeywords([]);
  };

  const busy = phase !== "idle" && phase !== "ready";
  const ticket = 1000 + (seed % 9000);

  return (
    <section id="taste" className="border-y border-smoke bg-charcoal/40">
      <div className="mx-auto max-w-[1500px] px-[5vw] py-[12vh]">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[2.5px] text-gold">
            03 — Taste it first
          </p>
          <h2 className="mt-4 font-display text-[clamp(36px,4.5vw,64px)] font-extrabold uppercase leading-[1.05] tracking-[-1.5px]">
            Talk to the cook.
          </h2>
          <p className="mt-5 font-mono text-[13px] text-bone">
            Your story becomes your shirt.
          </p>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-warmgray">
            Type a small story — a person, a place, a moment. Watch the cook
            sketch a taste of it. The real thing happens at the van, artwork
            and all.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-16">
          <div className="border border-smoke bg-void">
            {/* kiosk header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-smoke px-6 py-3.5 font-mono text-[10px] uppercase tracking-[2px] text-warmgray">
              <span className="flex items-center gap-2.5">
                <span className="live-dot" aria-hidden="true" />
                BOBB Kitchen OS · Kiosk 01
              </span>
              <span>
                {phase === "idle" ? "Ticket # ————" : `Ticket #${ticket}`}
              </span>
            </div>

            <div className="grid lg:grid-cols-2">
              {/* left: the order window */}
              <div className="border-smoke p-6 md:p-10 lg:border-r">
                <label
                  htmlFor="story"
                  className="font-mono text-[11px] uppercase tracking-[2px] text-bone"
                >
                  Tell me something about you.
                </label>
                <textarea
                  id="story"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={4}
                  maxLength={280}
                  disabled={busy}
                  placeholder="Start anywhere — a memory, a place, a person. There's no wrong story."
                  className="mt-4 w-full resize-none border border-smoke bg-charcoal p-4 text-[15px] leading-relaxed text-bone placeholder:text-warmgray/70 disabled:opacity-60"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {SAMPLES.map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      disabled={busy}
                      onClick={() => setStory(sample)}
                      className="border border-smoke px-3 py-1.5 font-mono text-[10px] text-warmgray transition-colors hover:border-warmgray hover:text-bone disabled:opacity-50"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-6">
                  <button
                    type="button"
                    onClick={cookIt}
                    disabled={busy || !story.trim()}
                    className="bg-gold px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-void transition-colors hover:bg-golddim disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {busy ? "Cooking…" : "Send to the cook"}
                  </button>
                  {phase === "ready" && (
                    <button
                      type="button"
                      onClick={reset}
                      className="border-b border-smoke pb-1 font-mono text-[11px] uppercase tracking-[1px] text-warmgray transition-colors hover:border-warmgray hover:text-bone"
                    >
                      Try another story
                    </button>
                  )}
                </div>

                {/* kitchen log */}
                <div
                  aria-live="polite"
                  className="mt-8 min-h-[128px] space-y-2.5 font-mono text-[12px] leading-relaxed"
                >
                  {phase !== "idle" && (
                    <p className="text-bone">
                      <span className="text-gold">COOK</span> — {ack}
                    </p>
                  )}
                  {(phase === "reading" ||
                    phase === "cooking" ||
                    phase === "ready") && (
                    <>
                      <p className="text-warmgray">&gt; listening… ok</p>
                      <p className="text-warmgray">
                        &gt; picking out the good parts:{" "}
                        {keywords.length ? (
                          <span className="text-gold">
                            {keywords.join(" · ")}
                          </span>
                        ) : (
                          <span className="text-gold">ALL OF IT</span>
                        )}
                      </p>
                    </>
                  )}
                  {(phase === "cooking" || phase === "ready") && (
                    <div>
                      <p className="text-warmgray">
                        &gt; cooking artwork — 25 seconds a serving
                      </p>
                      <div
                        className={`cook-progress mt-2.5 ${
                          phase === "cooking" || phase === "ready"
                            ? "is-cooking"
                            : ""
                        }`}
                        role="progressbar"
                        aria-label="Cooking progress"
                        aria-valuetext={phase === "ready" ? "done" : "cooking"}
                      >
                        <span />
                      </div>
                    </div>
                  )}
                  {phase === "ready" && (
                    <div className="pt-2">
                      <p className="text-bone">
                        <span className="text-gold">COOK</span> — Ningalude
                        design ready. Eppo print cheyyam?
                      </p>
                      <p className="text-warmgray">
                        (Your design is ready. Should I print now?)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* right: the pass */}
              <div className="border-t border-smoke p-6 md:p-10 lg:border-t-0">
                {phase === "ready" ? (
                  <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
                    <DoodleArt seed={seed} />
                    <div className="min-w-[180px] border border-smoke p-5 font-mono text-[10px] uppercase leading-loose tracking-[1.5px] text-warmgray">
                      <p className="text-bone">Ticket #{ticket}</p>
                      <p className="mt-2 border-t border-dashed border-smoke pt-2">
                        Item: T-shirt
                        <br />
                        No. 01 — house special
                      </p>
                      <p className="mt-2 border-t border-dashed border-smoke pt-2">
                        Ingredients:
                        <br />
                        <span className="text-gold">
                          {keywords.length ? keywords.join(", ") : "your words"}
                        </span>
                      </p>
                      <p className="mt-2 border-t border-dashed border-smoke pt-2">
                        Status: <span className="text-gold">Ready</span>
                      </p>
                      <p className="mt-2 border-t border-dashed border-smoke pt-2 normal-case tracking-normal">
                        &ldquo;This shirt started as a conversation.&rdquo;
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="max-w-[52ch] text-[14px] leading-relaxed text-warmgray">
                        This is a taste, not the dish. The real cook lives in
                        the van — full artwork from your words, printed and
                        stitched in minutes, your name on the tag.
                      </p>
                      <a
                        href="#find"
                        className="mt-5 inline-block bg-gold px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-void transition-colors hover:bg-golddim"
                      >
                        Find the van
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center border border-dashed border-smoke p-8 text-center">
                    <p className="font-mono text-[11px] uppercase tracking-[2px] text-warmgray">
                      The pass
                    </p>
                    <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-warmgray">
                      {busy
                        ? "Your art is being made."
                        : "Your serving comes up here."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
