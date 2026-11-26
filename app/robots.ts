import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Demo site: ask all search engines to stay out.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
