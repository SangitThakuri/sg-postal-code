import { NextResponse } from "next/server";

const BASE = "https://www.sgpostalcode.com";

const PAGES = [
  { url: BASE, priority: "1.0", changefreq: "weekly" },
  { url: `${BASE}/search`, priority: "0.9", changefreq: "weekly" },
  { url: `${BASE}/about`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE}/contact`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE}/privacy-policy`, priority: "0.3", changefreq: "monthly" },
  { url: `${BASE}/terms-of-service`, priority: "0.3", changefreq: "monthly" },
  { url: `${BASE}/disclaimer`, priority: "0.3", changefreq: "monthly" },
  { url: `${BASE}/cookie-policy`, priority: "0.3", changefreq: "monthly" },
];

// Fixed date for these static pages — bump only when their content actually
// changes. Recomputing `new Date()` per-request made lastmod tick forward
// daily even though nothing changed, which erodes Google's trust in it.
const STATIC_PAGES_LASTMOD = "2026-07-06";

export async function GET() {
  const urls = PAGES.map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${STATIC_PAGES_LASTMOD}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
