import { BrandMark } from "./BrandLogo";

// Case study imagery: add `image: "/work/<file>"` to a project in
// src/content/pages/portfolio.ts and the card shows it instead of the
// branded placeholder below.

export type CaseStudy = {
  n: string;
  tags: string[];
  title: string;
  desc: string;
  location: string;
  industry: string;
  image?: string;
};

// Brand-blue placeholder covers, one shade per card, until real imagery lands.
const PLACEHOLDER_TONES = [
  "from-[#3730e8]/45 via-[#16143a] to-[#0a0a0a]",
  "from-[#3730e8]/30 via-[#121130] to-[#0a0a0a]",
  "from-[#3730e8]/20 via-[#0f0e24] to-[#0a0a0a]",
];

export function CaseStudyCard({ study, tone = 0 }: { study: CaseStudy; tone?: number }) {
  return (
    <article className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#121212] text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] md:grid-cols-[1.15fr_1fr]">
      <div
        className={`relative flex aspect-[4/3] items-end bg-gradient-to-br p-6 md:aspect-auto md:min-h-[460px] ${
          PLACEHOLDER_TONES[tone % PLACEHOLDER_TONES.length]
        }`}
      >
        {study.image ? (
          <img
            src={study.image}
            alt={`${study.title} project imagery`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <span
              aria-hidden="true"
              className="display absolute left-6 top-4 text-[9rem] font-light leading-none text-white/10 md:text-[12rem]"
            >
              {study.title.charAt(0)}
            </span>
            <BrandMark height={28} className="relative h-7 w-auto opacity-60" />
          </>
        )}
      </div>
      <div className="flex flex-col p-6 md:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2" aria-label="Services delivered">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-white/80"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="shrink-0 font-mono text-xs tabular-nums tracking-[0.2em] text-white/60">
            {study.n}
          </span>
        </div>
        <h3 className="display mb-4 text-3xl leading-tight md:text-5xl">{study.title}</h3>
        <p className="mb-10 max-w-[44ch] text-base leading-relaxed text-white/75">{study.desc}</p>
        <dl className="mt-auto grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Location</dt>
            <dd className="mt-1 text-sm">{study.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Industry</dt>
            <dd className="mt-1 text-sm">{study.industry}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
