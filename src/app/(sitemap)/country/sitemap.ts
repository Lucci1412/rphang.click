import { db } from "@/db";
import { country } from "@/db/schema";
import type { MetadataRoute } from "next";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
const BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countries = await db
    .select()
    .from(country)
    .where(eq(country.isHidden, false));
  const items = countries.map((item) => ({
    url: `${BASE_URL}/quoc-gia/phim-sex-${item.slug}`,
    lastModified: format(new Date(), "yyyy-MM-dd"),
  }));

  return [...items];
}
