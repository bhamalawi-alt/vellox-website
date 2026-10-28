import { Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

// Arabic pages only. next/font preloads every font declared in a module that
// a route imports, so the Arabic set lives apart from ./fonts.ts: English
// pages never preload Plex Arabic and Arabic pages never preload Optika/Geist.
// globals.css points --font-display and --font-sans at --font-arabic under
// html[lang="ar"].
export const plexArabic = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const geistMonoArabic = Geist_Mono({
  variable: "--font-mono",
  display: "swap",
  subsets: ["latin"],
});
