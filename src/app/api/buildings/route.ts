import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Per-sector subset of the old file-based endpoint. Not called anywhere in
// this app's own UI — kept for any external consumer of the old dump. The
// previous full-dataset form SELECTed all ~141k rows on every uncached hit
// (142k rows read against D1's Free-plan 5M/day budget) and returned ~42 MB,
// within a few MB of D1's 50 MB result-size limit, so it is now scoped to
// one postal sector via the postal index. The full dataset remains
// available as a static asset at /data/buildings.json (no D1 involved).
export async function GET(request: NextRequest) {
  const sector = request.nextUrl.searchParams.get("sector") ?? "";
  if (!/^\d{1,2}$/.test(sector)) {
    return NextResponse.json(
      {
        error:
          "Missing or invalid 'sector' parameter — use a 1-2 digit postal sector, e.g. ?sector=63. For the full dataset, fetch https://www.sgpostalcode.com/data/buildings.json",
      },
      { status: 400 }
    );
  }
  const prefix = sector.padStart(2, "0");

  try {
    const { env } = await getCloudflareContext({ async: true });
    const { results } = await env.DB.prepare(
      "SELECT postal, building, address, road_name, blk_no, searchval, latitude, longitude FROM buildings WHERE postal GLOB ?1"
    )
      .bind(`${prefix}*`)
      .all<{
        postal: string;
        building: string;
        address: string;
        road_name: string;
        blk_no: string;
        searchval: string;
        latitude: number;
        longitude: number;
      }>();

    const buildings = results.map((r) => ({
      ADDRESS: r.address,
      BLK_NO: r.blk_no,
      BUILDING: r.building,
      LATITUDE: String(r.latitude),
      LONGITUDE: String(r.longitude),
      LONGTITUDE: String(r.longitude),
      POSTAL: r.postal,
      ROAD_NAME: r.road_name,
      SEARCHVAL: r.searchval,
      X: "",
      Y: "",
    }));

    return NextResponse.json(buildings, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Buildings data not available" },
      { status: 503 }
    );
  }
}
