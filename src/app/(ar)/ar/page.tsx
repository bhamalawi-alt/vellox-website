import type { Metadata } from "next";
import { homeCopy } from "../../../content/pages";
import { pageMeta } from "../../../lib/seo";

// Placeholder until Task 8 wires HomePage; proves the Arabic root layout.
export const metadata: Metadata = pageMeta({
  title: "Vellox Studio — علامات تجارية ومواقع ومتاجر وERPNext",
  description: homeCopy("ar").hero.metaDescription,
  path: "/",
  locale: "ar",
});

export default function ArabicHome() {
  return (
    <section className="bg-bg px-6 py-40 text-ink">
      <h1 className="display text-5xl">مرحبًا</h1>
    </section>
  );
}
