import type { Metadata } from "next";
import { COPY } from "../../content/pages/privacy";
import { pageMeta } from "../../lib/seo";
import { LegalPage } from "../../components/LegalPage";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy — Vellox Studio",
  description: COPY.paragraphs[0],
  path: "/privacy/",
});

export default function Privacy() {
  return <LegalPage title={COPY.title} paragraphs={COPY.paragraphs} />;
}
