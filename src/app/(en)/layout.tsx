import type { Metadata, Viewport } from "next";
import { optika, geistSans, geistMono } from "../fonts";
import { SiteShell } from "../../components/SiteShell";
import { BASE } from "../../lib/seo";
import { TAGLINE } from "../../content/site";
import "../globals.css";

// English root layout. The Arabic twin is src/app/(ar)/layout.tsx; the two
// share SiteShell and differ only in <html> attributes and fonts.
// Site-wide defaults only. Each page sets its own canonical and og:url through
// pageMeta, so routes that don't (the 404 page) never inherit the homepage's.
export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Vellox Studio",
  description: TAGLINE,
  openGraph: {
    siteName: "Vellox Studio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Vellox Studio" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${optika.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <SiteShell locale="en">{children}</SiteShell>
    </html>
  );
}
