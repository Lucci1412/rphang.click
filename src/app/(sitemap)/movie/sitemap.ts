import { db } from "@/db";
import type { MetadataRoute } from "next";
import { format } from "date-fns";
import { movie } from "@/db/schema";

const BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const movies = await db.select().from(movie);
  const items = movies.map((item) => ({
    url: `${BASE_URL}/${
      item.type == "single"
        ? "phim-le"
        : item.type == "series"
        ? "phim-bo"
        : item.type == "hoathinh"
        ? "hoat-hinh"
        : "tvshow"
    }/${item.slug}-${item.quality}-${item.year}`,
    lastModified: format(new Date(), "yyyy-MM-dd"),
  }));

  return [...items];
}
