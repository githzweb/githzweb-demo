import type { NextConfig } from "next";

// Static export: the whole site is plain HTML/JS files in `out/`, hosted free on
// Cloudflare Pages. Headers (noindex etc.) live in public/_headers and the Studio
// fallback in public/_redirects, because static export can't use next.config headers.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
