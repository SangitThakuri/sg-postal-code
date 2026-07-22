import { NextRequest, NextResponse } from "next/server";
import { getPostalCodesPage, getDataLastModified } from "@/lib/data";

const BASE = "https://www.sgpostalcode.com";
const BATCH = 40000;

// No generateStaticParams: D1 (via getCloudflareContext) is only reachable
// at Worker request time, not during `next build`, so this stays a fully
// dynamic route rendered on demand.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);

  if (isNaN(page) || page < 1) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const batch = await getPostalCodesPage((page - 1) * BATCH, BATCH);

  if (!batch.length) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const lastmod = await getDataLastModified();
  const urls = batch
    .map(
      (p) => `  <url>
    <loc>${BASE}/postal/${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n");

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
