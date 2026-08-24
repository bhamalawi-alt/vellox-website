import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import { COPY } from "../../content/pages/contact";
import { pageMeta } from "../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact — Vellox Studio",
  description: COPY.lede,
  path: "/contact",
});

const darkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Contact() {
  return (
    <>
      <section className="bg-[#0a0a0a] py-24 text-bg md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/70">
            {COPY.eyebrow}
          </p>
          <h1 className="display max-w-[22ch] text-[clamp(2rem,4.15vw,3.7rem)] font-light leading-[1.05] text-white/60">
            {COPY.headline}
          </h1>
          <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-white/70 md:text-lg">
            {COPY.lede}
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0a] py-20 text-bg md:py-28">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16">
          <dl className="h-fit md:col-span-5 md:sticky md:top-24">
            {COPY.details.map((detail) => (
              <div
                key={detail.term}
                className="flex items-baseline justify-between gap-6 border-b border-white/10 py-5 first:border-t first:border-white/10"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  {detail.term}
                </dt>
                <dd className="text-right text-sm font-medium">
                  {detail.term === "Email" ? (
                    <a
                      href={`mailto:${detail.value}`}
                      className={`underline-offset-4 transition-colors hover:text-white hover:underline ${darkFocus}`}
                    >
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
