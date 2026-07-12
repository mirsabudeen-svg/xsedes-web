import { site } from "@/content/site";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
      <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--dim)]">
        § 01 · XSEDES
      </p>
      <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight md:text-6xl">
        {site.name}
      </h1>
      <p className="mt-4 text-lg font-medium text-[var(--accent)] md:text-xl">
        {site.tagline}
      </p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--dim)] md:text-lg">
        {site.oneLiner}
      </p>
    </main>
  );
}
