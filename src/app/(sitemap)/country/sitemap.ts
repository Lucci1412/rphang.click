import { db } from "@/db";
import { country } from "@/db/schema";
import type { MetadataRoute } from "next";
import { format } from "date-fns";
const BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countries = await db.select().from(country);
  const items = countries.map((item) => ({
    url: `${BASE_URL}/quoc-gia/${item.slug}`,
    lastModified: format(new Date(), "yyyy-MM-dd"),
  }));

  return [...items];
}