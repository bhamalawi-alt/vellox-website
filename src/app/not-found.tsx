import Link from "next/link";

const darkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function NotFound() {
  return (
    <section className="bg-[#0a0a0a] py-32 text-bg md:py-48">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h1 className="display max-w-[22ch] text-[clamp(2rem,4.15vw,3.7rem)] font-light leading-[1.05] text-white/60">
          404 — This page could not be found.
        </h1>
        <Link
          href="/"
          className={`mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white ${darkFocus}`}
        >
          <span aria-hidden="true" className="inline-block h-px w-8 bg-white/40" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
