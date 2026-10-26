import type { Metadata } from "next";
import { COPY } from "../../content/pages/privacy";
import { pageMeta } from "../../lib/seo";
import { LegalPage } from "../../components/LegalPage";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy — Vellox Studio",
  description: COPY.intro,
  path: "/privacy",
});

export default function Privacy() {
  return (
    <LegalPage
      title={COPY.title}
      updated={COPY.updated}
      intro={COPY.intro}
      sections={COPY.sections}
    />
  );
}
