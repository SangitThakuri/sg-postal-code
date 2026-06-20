import { NextResponse } from "next/server";
import { getAllPostalCodes } from "@/lib/data";

const BASE = "https://www.sgpostalcode.com";
const BATCH = 40000;

export async function GET() {
  const postals = await getAllPostalCodes();
  const batches = Math.ceil(postals.length / BATCH);
  const today = new Date().toISOString().split("T")[0];

  const staticEntry = `  <sitemap>
    <loc>${BASE}/sitemap-pages</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`;

  const postalEntries = Array.from({ length: batches }, (_, i) => `  <sitemap>
    <loc>${BASE}/postal-sitemap/${i + 1}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntry}
${postalEntries}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
