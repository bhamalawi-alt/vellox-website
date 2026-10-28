import type { Metadata } from "next";
import ContactForm from "../ContactForm";
import { PageHero } from "../PageHero";
import { contactCopy } from "../../content/pages";
import { getUi } from "../../content/ui";
import type { Locale } from "../../lib/i18n";
import { pageMeta } from "../../lib/seo";
import { darkFocus } from "./shared";

export function contactMetadata(locale: Locale): Metadata {
  const copy = contactCopy(locale);
  return pageMeta({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "/contact",
    locale,
  });
}

export function ContactPage({ locale }: { locale: Locale }) {
  const COPY = contactCopy(locale);
  const ui = getUi(locale);
  return (
    <>
      <PageHero eyebrow={COPY.eyebrow} title={COPY.headline} lede={COPY.lede} />

      <section className="bg-[#0a0a0a] pb-24 pt-4 text-white md:pb-32">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16">
          <h2 className="sr-only">{ui.contactDetails}</h2>
          <dl className="h-fit md:col-span-5 md:sticky md:top-28">
            {COPY.details.map((detail, i) => (
              <div
                key={detail.term}
                className="flex items-baseline justify-between gap-6 border-b border-white/10 py-5 first:border-t first:border-white/10"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  {detail.term}
                </dt>
                <dd className="text-end text-sm font-medium">
                  {/* The first detail is the email address in both languages. */}
                  {i === 0 ? (
                    <a
                      href={`mailto:${detail.value}`}
                      dir="ltr"
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
            <h2 className="sr-only">{ui.sendMessage}</h2>
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
