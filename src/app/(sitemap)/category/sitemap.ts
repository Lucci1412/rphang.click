// import { db } from "@/db";
// import { category } from "@/db/schema";
// import { count } from "drizzle-orm";
// import type { MetadataRoute } from "next";
// const BASE_URL =
//   process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;
// export async function generateSitemaps() {
//   const totalCategoryResult = await db
//     .select({ count: count() }) // 👈 sử dụng count()
//     .from(category);
//   const total = totalCategoryResult[0]?.count || 0;
//   const productsPerSitemap = 50000;
//   const numberOfSitemaps = Math.ceil(total / productsPerSitemap);

//   const sitemaps = Array.from({ length: numberOfSitemaps }, (_, index) => ({
//     id: index,
//   }));

//   return sitemaps;
// }

// export default async function sitemap({
//   id,
// }: {
//   id: number;
// }): Promise<MetadataRoute.Sitemap> {
//   const start = id * 20;
//   const limit = 10;
//   const categories = await db
//     .select()
//     .from(category)
//     .limit(limit)
//     .offset(start);

//   const items = categories.map((item) => ({
//     url: `${BASE_URL}/category/${item.slug}`,
//     changefreq: "monthly",
//   }));

//   return [...items];
// }

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
