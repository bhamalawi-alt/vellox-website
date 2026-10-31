import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";
import { privacyCopy, termsCopy } from "../../content/pages";
import type { Locale } from "../../lib/i18n";
import { pageMeta } from "../../lib/seo";
import { ANALYTICS_ENABLED } from "../../lib/analytics";
import { privacySections } from "../../lib/privacy";

export function privacyMetadata(locale: Locale): Metadata {
  const copy = privacyCopy(locale);
  return pageMeta({ title: copy.metaTitle, description: copy.intro, path: "/privacy", locale });
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const copy = privacyCopy(locale);
  return <LegalPage locale={locale} title={copy.title} updated={copy.updated} intro={copy.intro} sections={privacySections(copy, ANALYTICS_ENABLED)} />;
}

export function termsMetadata(locale: Locale): Metadata {
  const copy = termsCopy(locale);
  return pageMeta({ title: copy.metaTitle, description: copy.intro, path: "/terms", locale });
}

export function TermsPage({ locale }: { locale: Locale }) {
  const copy = termsCopy(locale);
  return <LegalPage locale={locale} title={copy.title} updated={copy.updated} intro={copy.intro} sections={copy.sections} />;
}
