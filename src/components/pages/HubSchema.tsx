import { getSite } from "../../content/site";
import type { Locale } from "../../lib/i18n";
import { hubGraph } from "../../lib/seo";
import { jsonLd } from "./shared";

/**
 * Structured data for a top-level page: its type and its breadcrumb. The
 * name is the page's label in the main navigation, so the two always match.
 */
export function HubSchema({
  locale,
  path,
  type,
}: {
  locale: Locale;
  path: string;
  type: "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  const name = getSite(locale).NAV_ITEMS.find((item) => item.href === path)?.label ?? path;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(hubGraph({ locale, path, name, type })) }}
    />
  );
}
