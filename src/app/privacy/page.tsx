import type { Metadata } from "next";
import { COPY } from "../../content/pages/privacy";
import { pageMeta } from "../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy — Vellox Studio",
  description: COPY.paragraphs[0],
  path: "/privacy/",
});

export default function Privacy() {
  return (
    <>
      <section className="bg-[#0a0a0a] py-24 text-bg md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h1 className="display max-w-[22ch] text-[clamp(2rem,4.15vw,3.7rem)] font-light leading-[1.05] text-white/60">
            {COPY.title}
          </h1>
        </div>
      </section>

      <section className="border-t border-line bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-[68ch] space-y-6">
            {COPY.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
