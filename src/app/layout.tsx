import type { Metadata } from "next";
import { optika, geistSans, geistMono } from "./fonts";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${optika.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
