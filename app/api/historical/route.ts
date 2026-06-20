import { NextRequest, NextResponse } from "next/server";
import { generateHistory, type TimePeriod } from "@/lib/gold-data";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const period = (request.nextUrl.searchParams.get("period") ?? "7D") as TimePeriod;
  const validPeriods: TimePeriod[] = ["1D", "7D", "30D", "1Y"];

  if (!validPeriods.includes(period)) {
    return NextResponse.json({ error: "Invalid period" }, { status: 400 });
  }

  const data = generateHistory(period);
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
