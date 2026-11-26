import type { MetadataRoute } from "next";

// Demo site: ask all search engines to stay out.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
