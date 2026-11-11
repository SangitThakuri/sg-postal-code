import { NextResponse } from "next/server";
import { getPostalCodeCount, getDataLastModified } from "@/lib/data";

const BASE = "https://www.sgpostalcode.com";
const BATCH = 40000;

// Without this, Next tries to statically prerender this route at build
// time (no dynamic segment here to force it otherwise) — D1 is only
// reachable at actual Worker request time, not during `next build`.
export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getPostalCodeCount();
  const batches = Math.ceil(count / BATCH);
  const lastmod = await getDataLastModified();

  const staticEntry = `  <sitemap>
    <loc>${BASE}/sitemap-pages</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;

  const postalEntries = Array.from({ length: batches }, (_, i) => `  <sitemap>
    <loc>${BASE}/postal-sitemap/${i + 1}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntry}
${postalEntries}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
}
