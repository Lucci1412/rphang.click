import { format } from "date-fns";
import { NextResponse } from "next/server";
const BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_SITE_URL;
const listSiteMaps = [

  {
    url: `${BASE_URL}/the-loai/sitemap.xml`,
  },
  {
    url: `${BASE_URL}/quoc-gia/sitemap.xml`,
  },
  {
    url: `${BASE_URL}/xem-phim/sitemap.xml`,
  },
];
export async function GET() {
  try {
    const sitemaps = [
      ...listSiteMaps.map((sitemap) => sitemap.url),
    ];


    // Build XML
    const sitemapIndexXML = await buildSitemapIndex(sitemaps);

    return new NextResponse(sitemapIndexXML, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Length": Buffer.byteLength(sitemapIndexXML).toString(),
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return NextResponse.error();
  }
}

async function buildSitemapIndex(sitemaps: string[]) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  for (const sitemapURL of sitemaps) {
    xml += "<sitemap>";
    xml += `<loc>${sitemapURL}</loc>`;
    xml += `<lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>`;
    xml += "</sitemap>";
  }

  xml += "</sitemapindex>";
  return xml;
}