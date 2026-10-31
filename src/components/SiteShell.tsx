import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MotionProvider } from "./MotionProvider";
import { WhatsAppButton } from "./WhatsAppButton";
import { AnalyticsConsent } from "./AnalyticsConsent";
import { ANALYTICS_ENABLED } from "../lib/analytics";
import { BASE } from "../lib/seo";
import type { Locale } from "../lib/i18n";
import { EMAIL, getSite, WHATSAPP } from "../content/site";
import { getUi } from "../content/ui";

// Everything inside <html> that both root layouts share: the organisation
// JSON-LD, the skip link, header, main and footer. Each layout owns only the
// <html> element (lang, dir, fonts) and renders this inside it.
function orgJsonLd(locale: Locale) {
  const site = getSite(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: "Vellox Studio",
        url: `${BASE}/`,
        logo: `${BASE}/icon-512.png`,
        description: site.TAGLINE,
        // The markets the studio targets, as schema.org countries.
        areaServed: ["Libya", "Saudi Arabia", "United Arab Emirates", "Oman", "Qatar", "Kuwait", "Bahrain", "Europe"].map(
          (name) => (name === "Europe" ? { "@type": "Place", name } : { "@type": "Country", name }),
        ),
        // Profiles only; the WhatsApp chat link goes in contactPoint instead.
        sameAs: site.SOCIAL_LINKS.filter((s) => s.href.startsWith("http") && !s.href.includes("wa.me")).map(
          (s) => s.href,
        ),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: `+${WHATSAPP.number}`,
          email: EMAIL,
          availableLanguage: ["English", "Arabic"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        name: "Vellox Studio",
        url: `${BASE}/`,
        inLanguage: locale,
        publisher: { "@id": `${BASE}/#organization` },
      },
    ],
  };
}

export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const ui = getUi(locale);
  return (
    <body id="top" className="min-h-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(locale)) }}
      />
      <MotionProvider>
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-white px-5 py-3 text-sm text-ink focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {ui.skipToContent}
        </a>
        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <WhatsAppButton locale={locale} />
        {ANALYTICS_ENABLED ? <AnalyticsConsent locale={locale} /> : null}
      </MotionProvider>
    </body>
  );
}
