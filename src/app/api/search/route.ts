import { NextRequest, NextResponse } from "next/server";
import { searchBuildings } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? "";
  const requestedLimit = parseInt(searchParams.get("limit") ?? "30", 10);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 100)
    : 30;

  if (!q.trim()) {
    return NextResponse.json([]);
  }

  try {
    const results = await searchBuildings(q.trim(), limit);
    return NextResponse.json(results, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
