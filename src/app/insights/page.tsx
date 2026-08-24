import type { Metadata } from "next";
import { COPY } from "../../content/pages/insights";
import { pageMeta } from "../../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Insights — Vellox Studio",
  description: COPY.lede,
  path: "/insights",
});

const lightFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

function discussHref(title: string) {
  return `mailto:hello@velloxstudio.com?subject=${encodeURIComponent(title)}`;
}

export default function Insights() {
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

      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-4xl px-6">
          <ul aria-label={COPY.eyebrow}>
            {COPY.articles.map((article) => (
              <li
                key={article.title}
                className="border-b border-line py-12 first:border-t first:pt-12 md:py-16"
              >
                <article>
                  <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                      {article.category}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted tabular-nums">
                      {article.date}
                    </span>
                  </div>
                  <h2 className="display mb-4 max-w-[24ch] text-2xl leading-[1.15] md:text-3xl">
                    {article.title}
                  </h2>
                  <p className="mb-8 max-w-[68ch] text-sm leading-relaxed text-muted md:text-base">
                    {article.excerpt}
                  </p>
                  <a
                    href={discussHref(article.title)}
                    className={`group inline-flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-ink transition-colors duration-300 ease-out hover:text-muted ${lightFocus}`}
                  >
                    {article.linkLabel}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
