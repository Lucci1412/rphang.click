import { db } from "@/db";
import { movie } from "@/db/schema";
import { count } from "drizzle-orm";

const BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

const PAGE_SIZE = 2000;

export async function GET() {
  const totalMoviesResult = await db.select({ count: count() }).from(movie);
  const totalMovies = totalMoviesResult[0].count;
  const numSitemaps = Math.ceil(totalMovies / PAGE_SIZE);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: numSitemaps }, (_, i) => {
  return `<sitemap>
    <loc>${BASE_URL}/sitemap/${i}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
}).join("\n")}
</sitemapindex>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
