import { Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

// Arabic pages only. Next preloads every font any root layout declares on
// every page, so preload is off here: English pages must not download the
// Arabic files, and the Arabic family swaps in (display: swap) when it
// arrives. globals.css points --font-display and --font-sans at --font-arabic
// under html[lang="ar"]; the mono labels use it too, so Geist Mono is not
// preloaded on Arabic pages either.
export const plexArabic = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

export const geistMonoArabic = Geist_Mono({
  variable: "--font-mono",
  display: "swap",
  subsets: ["latin"],
  preload: false,
});
