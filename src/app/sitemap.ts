import type { MetadataRoute } from "next";
import { db } from "@/db"; 
import { movie } from "@/db/schema"; 
import { format } from "date-fns";
import { count } from 'drizzle-orm'; 

import { PAGE_SITEMAP_LIMIT } from "@/const";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_LOCAL_URL ||
  "http://localhost:3000"; 

const PAGE_SIZE = PAGE_SITEMAP_LIMIT;

export async function generateSitemaps() {
  try {
    const totalMoviesResult = await db.select({ count: count() }).from(movie);
    const totalMovies = totalMoviesResult[0].count;

    const numSitemaps = Math.ceil(totalMovies / PAGE_SIZE);

    return Array.from({ length: numSitemaps }, (_, i) => ({ id: i }));

  } catch (error) {
    console.error("Error generating sitemaps:", error);
    return [{ id: 0 }]; 
  }
}


export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const start = id * PAGE_SIZE; 

  try {
    const movies = await db
      .select({ slug: movie.slug, updatedAt: movie.updatedAt }) 
      .from(movie)
      .limit(PAGE_SIZE)
      .offset(start);

    return movies.map((movie) => ({
      url: `${BASE_URL}/xem-phim/${movie.slug}`, 
      lastModified: movie.updatedAt
        ? format(movie.updatedAt, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      changeFrequency: 'daily', 
      priority: 0.7, 
    }));

  } catch (error) {
    console.error(`Error fetching movies for sitemap id ${id}:`, error);
    return []; 
  }
}
