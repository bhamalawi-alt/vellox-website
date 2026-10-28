import Link from "next/link";
import { englishAttrs, type Project } from "../lib/projects";
import { aboutCopy, homeCopy } from "../content/pages";
import { getUi } from "../content/ui";
import { arrow, localePath, type Locale } from "../lib/i18n";
import { ArrowLink } from "./ui/arrow-link";

// The home page's proof block while projects have no cover imagery yet: the
// real testimonials from the About page and a compact list of recent clients.
// Once a featured project has a cover, page.tsx shows the case-study cards
// instead, so this component is the "no imagery yet" state, not a permanent one.
export function HomeProof({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const COPY = homeCopy(locale);
  const ABOUT = aboutCopy(locale);
  const ui = getUi(locale);
  const quotes = COPY.proof.testimonialNames
    .map((name) => ABOUT.testimonials.find((t) => t.name === name))
    .filter((t): t is (typeof ABOUT)["testimonials"][number] => Boolean(t));

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <h3 className="mb-6 text-sm font-medium text-white/60">{COPY.proof.quotesHeading}</h3>
        <ul className="space-y-10">
          {quotes.map((t) => (
            <li key={t.name}>
              <figure>
                <blockquote className="display text-2xl leading-[1.25] text-white md:text-3xl">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-4 text-sm text-white/70">
                  <span className="font-medium text-white">{t.name}</span>, {t.role}, {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <ArrowLink href={localePath(locale, "/about#testimonials")} className="mt-10 text-sm uppercase tracking-[0.12em] text-white/80 hover:text-white">
          {COPY.proof.allReferences}
        </ArrowLink>
      </div>

      <div className="lg:col-span-5">
        <h3 className="mb-6 text-sm font-medium text-white/60">{COPY.proof.clientsHeading}</h3>
        <ul className="border-t border-white/10">
          {projects.map((p) => (
            <li key={p.slug} className="border-b border-white/10">
              <Link
                href={localePath(locale, `/portfolio/${p.slug}`)}
                className="group flex items-baseline justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span>
                  <span
                    {...englishAttrs(p, "title")}
                    className="display block text-xl text-white transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 md:text-2xl"
                  >
                    {p.title}
                  </span>
                  <span
                    {...(p.fallbackFields.includes("industry") || p.fallbackFields.includes("location") ? { lang: "en", dir: "ltr" as const } : {})}
                    className="mt-1 block text-sm text-white/70"
                  >
                    {[p.industry, p.location, p.year].filter(Boolean).join(" · ")}
                  </span>
                  <span {...englishAttrs(p, "tags")} className="mt-1 block text-sm text-white/60">
                    {p.tags.join(locale === "ar" ? "، " : ", ")}
                  </span>
                  {!p.translated ? (
                    <span className="mt-1 block text-xs text-white/50">{ui.englishOnlyNote}</span>
                  ) : null}
                </span>
                <span aria-hidden="true" className="text-white/60 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {arrow(locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
