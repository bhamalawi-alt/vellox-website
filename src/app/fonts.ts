import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

export const optika = localFont({
  src: [
    { path: "../../public/fonts/Optika-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Optika-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Optika-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const geistSans = Geist({ variable: "--font-sans", display: "swap", subsets: ["latin"] });
export const geistMono = Geist_Mono({ variable: "--font-mono", display: "swap", subsets: ["latin"] });
