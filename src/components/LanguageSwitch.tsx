"use client";

import { usePathname } from "next/navigation";
import { alternatePath, ARABIC_LIVE, type Locale } from "../lib/i18n";
import { getUi } from "../content/ui";

// "عربي" on English pages, "English" on Arabic ones, pointing at the same page
// in the other language. A plain <a>: the two languages have different root
// layouts, so the switch is a full page load either way. Hidden while the
// Arabic site is not announced (ARABIC_LIVE off).
export function LanguageSwitch({ locale, className = "" }: { locale: Locale; className?: string }) {
  const pathname = usePathname();
  if (!ARABIC_LIVE) return null;
  const ui = getUi(locale);
  const target = alternatePath(pathname);
  return (
    <a
      href={target.href}
      lang={target.locale}
      hrefLang={target.locale}
      aria-label={ui.switchLanguageAria}
      className={className}
    >
      {ui.switchLanguage}
    </a>
  );
}
