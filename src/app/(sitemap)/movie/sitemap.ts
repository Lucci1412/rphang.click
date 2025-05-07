import { db } from "@/db";
import type { MetadataRoute } from "next";
import { format } from "date-fns";
import { movie } from "@/db/schema";
import { desc } from "drizzle-orm";

const BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 

  const movies = await db.select({slug:movie.slug}).from(movie).limit(2000).orderBy(desc(movie.updatedAt));

  const items = movies.map((item) => ({
    url: `${BASE_URL}/phim/${item.slug}`,
    lastModified: format(new Date(), "yyyy-MM-dd"),
  }));

  return [...items];
}