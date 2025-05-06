// app/sitemap.xml/route.ts
import { db } from "@/db";
import { country } from "@/db/schema";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const countries = await db.select().from(country);

  const urls = countries.map((item) => {
    return `
      <url>
        <loc>${BASE_URL}/phim/${item.slug}</loc>
        <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
      </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Length": Buffer.byteLength(xml).toString(),
    },
  });
}