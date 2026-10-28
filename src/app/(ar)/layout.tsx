import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { geistMonoArabic, plexArabic } from "../fonts-arabic";
import { SiteShell } from "../../components/SiteShell";
import { BASE } from "../../lib/seo";
import { ARABIC_LIVE } from "../../lib/i18n";
import { getSite } from "../../content/site";
import "../globals.css";

// Arabic root layout: right-to-left document with IBM Plex Sans Arabic.
// Routes live under ./ar/ and mirror src/app/(en)/.
export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Vellox Studio",
  description: getSite("ar").TAGLINE,
  ...(ARABIC_LIVE ? {} : { robots: { index: false, follow: false } }),
  openGraph: {
    siteName: "Vellox Studio",
    locale: "ar",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Vellox Studio" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark light",
};

export default function ArabicRootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${plexArabic.variable} ${geistMonoArabic.variable} h-full antialiased`}
    >
      <SiteShell locale="ar">{children}</SiteShell>
    </html>
  );
}
