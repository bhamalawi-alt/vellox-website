import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "../components/BrandLogo";
import { HeroArt } from "../components/HeroArt";
import { HeroLoop } from "../components/motion/HeroLoop";
import { getUi } from "../content/ui";
import "./globals.css";

// Served for any URL that matches no route, in either language, so it is
// bilingual: English first, Arabic second. It bypasses the root layouts, so it
// carries its own styles; system fonts keep it from preloading every webfont
// on every page (next/font preloads whatever a root-level file declares).
export const metadata: Metadata = {
  title: "Page not found · الصفحة غير موجودة — Vellox Studio",
  robots: { index: false, follow: false },
};

const link =
  "inline-flex min-h-11 items-center text-sm uppercase tracking-[0.12em] text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function GlobalNotFound() {
  const en = getUi("en").notFound;
  const ar = getUi("ar").notFound;
  return (
    <html
      lang="en"
      className="h-full antialiased [--font-display:ui-sans-serif,system-ui] [--font-sans:ui-sans-serif,system-ui] [--font-mono:ui-monospace,monospace] [--font-arabic:system-ui,sans-serif]"
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-[#0a0a0a] text-white">
        {/* On phones, shift the crop so the sculpture at the right stays in view. */}
        <HeroArt name="notfound" className="max-md:object-[72%_50%]" />
        <HeroLoop name="notfound-loop" className="max-md:object-[72%_50%]" />
        {/* Darken the side the English text sits on; the Arabic sits over the artwork, so dim that too. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-[#0a0a0a]/25"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/45 md:hidden" />
        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24">
          <BrandMark height={36} className="mb-10 h-9 w-auto self-start opacity-90" />
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/70">404</p>
          <h1 className="display max-w-[20ch] text-white text-[2.4rem] font-light leading-[1.03] tracking-[-0.02em] md:text-[clamp(3.2rem,5.5vw,4.6rem)]">
            {en.title}
          </h1>
          <Link href="/" className={`${link} mt-8`}>
            {en.back} <span aria-hidden="true">→</span>
          </Link>
          <section lang="ar" dir="rtl" className="mt-16 border-t border-white/10 pt-10 [font-family:var(--font-arabic),sans-serif]">
            <h2 className="max-w-[20ch] text-white text-[2rem] font-light leading-[1.3] md:text-[clamp(2.6rem,4.5vw,3.6rem)]">
              {ar.title}
            </h2>
            <Link href="/ar" className={`${link} mt-8 normal-case tracking-normal`}>
              {ar.back} <span aria-hidden="true">←</span>
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
