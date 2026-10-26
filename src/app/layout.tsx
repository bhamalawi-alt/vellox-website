import type { Metadata, Viewport } from "next";
import { optika, geistSans, geistMono } from "./fonts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MotionProvider } from "../components/MotionProvider";
import { BASE } from "../lib/seo";
import { SOCIAL_LINKS, TAGLINE } from "../content/site";
import "./globals.css";

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

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "Vellox Studio",
      url: `${BASE}/`,
      logo: `${BASE}/icon-512.png`,
      description: TAGLINE,
      foundingDate: "2019",
      areaServed: ["Europe", "Middle East", "North Africa"],
      sameAs: SOCIAL_LINKS.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      name: "Vellox Studio",
      url: `${BASE}/`,
      publisher: { "@id": `${BASE}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${optika.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-[70] rounded-full bg-white px-5 py-3 text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
