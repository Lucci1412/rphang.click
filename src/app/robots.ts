import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/tim-kiem/", "/profile/"],
    },
    sitemap: `${BASE_URL}/sitemap_index.xml`,
  };
}
