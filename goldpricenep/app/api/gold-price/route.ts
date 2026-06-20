import { NextResponse } from "next/server";
import { MOCK_GOLD_PRICE } from "@/lib/gold-data";

export const revalidate = 300; // 5-minute cache

export async function GET() {
  // ── Production: replace this block with a real API call ──────────
  // const res = await fetch("https://www.goldapi.io/api/XAU/USD", {
  //   headers: { "x-access-token": process.env.GOLD_API_KEY! },
  //   next: { revalidate: 300 },
  // });
  // const raw = await res.json();
  // Transform raw → GoldPrice shape, then return.
  // ──────────────────────────────────────────────────────────────────

  const data = {
    ...MOCK_GOLD_PRICE,
    last_updated: new Date().toISOString(),
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
