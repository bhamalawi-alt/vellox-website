import type { Metadata } from "next";
import { optika, geistSans, geistMono } from "./fonts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MotionProvider } from "../components/MotionProvider";
import { BASE, pageMeta } from "../lib/seo";
import { TAGLINE } from "../content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  ...pageMeta({
    title: "Vellox Studio",
    description: TAGLINE,
    path: "/",
  }),
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    apple: "/logos/logo-13.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${optika.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full flex flex-col">
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
