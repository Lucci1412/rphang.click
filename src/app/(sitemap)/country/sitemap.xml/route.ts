import { db } from "@/db";
import {  country } from "@/db/schema";
import { format } from "date-fns";

export async function GET() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;

  const countries = await db.select().from(country);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${countries
    .map((item) => {
      const url = `${BASE_URL}/quoc-gia/${item.slug}`;
      const lastMod = format(new Date(), "yyyy-MM-dd");
      return `<url><loc>${url}</loc><lastmod>${lastMod}</lastmod></url>`;
    })
    .join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
