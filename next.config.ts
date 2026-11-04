import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  productionBrowserSourceMaps: false,
  images: { unoptimized: true },
  experimental: {
    // Two root layouts (English and Arabic) leave no single layout to build
    // a 404 from; src/app/global-not-found.tsx renders the bilingual one.
    globalNotFound: true,
    // Put the (small, Tailwind) CSS in each page instead of separate
    // render-blocking files: first-time visitors on slow mobile networks see
    // the page one round trip sooner. Measured on the home page, mobile.
    inlineCss: true,
  },
};

export default nextConfig;
