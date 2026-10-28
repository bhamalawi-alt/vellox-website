import { getUi } from "../content/ui";
import type { Locale } from "../lib/i18n";
import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; paragraphs: string[] };

export function LegalPage({
  locale,
  title,
  updated,
  intro,
  sections,
}: {
  locale: Locale;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const ui = getUi(locale);
  return (
    <>
      <PageHero eyebrow={ui.legal} title={title} lede={ui.lastUpdated(updated)} />
      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-[68ch]">
            {/* Translations state that the English text prevails; the English
                string is empty, so nothing renders there. */}
            {ui.englishPrevails ? (
              <p className="mb-8 text-sm leading-relaxed text-muted">{ui.englishPrevails}</p>
            ) : null}
            <p className="mb-14 text-lg leading-relaxed md:text-xl">{intro}</p>
            {sections.map((section) => (
              <section key={section.heading} className="mb-12 border-t border-line pt-8">
                <h2 className="display mb-5 text-2xl md:text-3xl">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
