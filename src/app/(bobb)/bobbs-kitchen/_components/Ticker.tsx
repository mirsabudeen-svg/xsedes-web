const LINES = [
  "Made fresh",
  "Made from your words",
  "Kannur",
  "25 seconds a serving",
  "Not mass-produced. Just you.",
];

export default function Ticker() {
  const row = LINES.flatMap((line, i) => [
    <span key={`t-${i}`} className="whitespace-nowrap px-7">
      {line}
    </span>,
    <span key={`d-${i}`} className="px-2 text-golddim" aria-hidden="true">
      ·
    </span>,
  ]);

  return (
    <div
      className="overflow-hidden border-y border-smoke py-4 font-mono text-[12px] uppercase tracking-[3px] text-warmgray"
      aria-hidden="true"
    >
      <div className="ticker-track">
        {row}
        {row}
      </div>
    </div>
  );
}
