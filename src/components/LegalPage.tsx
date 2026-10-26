import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; paragraphs: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lede={`Last updated ${updated}.`} />
      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-[68ch]">
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
