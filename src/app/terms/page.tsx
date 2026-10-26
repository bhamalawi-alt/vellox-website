import type { Metadata } from "next";
import { COPY } from "../../content/pages/terms";
import { pageMeta } from "../../lib/seo";
import { LegalPage } from "../../components/LegalPage";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use — Vellox Studio",
  description: COPY.intro,
  path: "/terms",
});

export default function Terms() {
  return (
    <LegalPage
      title={COPY.title}
      updated={COPY.updated}
      intro={COPY.intro}
      sections={COPY.sections}
    />
  );
}
