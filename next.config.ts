import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  productionBrowserSourceMaps: false,
  images: { unoptimized: true },
  experimental: {
    // Two root layouts (English and Arabic) leave no single layout to build
    // a 404 from; src/app/global-not-found.tsx renders the bilingual one.
    globalNotFound: true,
  },
};

export default nextConfig;
