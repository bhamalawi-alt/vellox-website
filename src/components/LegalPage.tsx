import { PageHero } from "./PageHero";

export function LegalPage({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <section className="bg-bg py-20 text-ink md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-[68ch] space-y-6">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
