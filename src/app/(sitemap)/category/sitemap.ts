import { db } from "@/db";
import { category } from "@/db/schema";
import type { MetadataRoute } from "next";
import { format } from "date-fns";
const BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await db.select().from(category);
  const items = categories.map((item) => ({
    url: `${BASE_URL}/the-loai/${item.slug}`,
    lastModified: format(new Date(), "yyyy-MM-dd"),
  }));

  return [...items];
}