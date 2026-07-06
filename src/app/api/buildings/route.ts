import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Raw full-dataset dump. Not called anywhere in this app's own UI — kept for
// any external consumer of the old file-based endpoint. Previously streamed
// buildings.json straight off disk via fs; that file isn't bundled into the
// Worker (see src/lib/data.ts), so this now reconstructs the same shape from D1.
export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const { results } = await env.DB.prepare(
      "SELECT postal, building, address, road_name, blk_no, searchval, latitude, longitude FROM buildings"
    ).all<{
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
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
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
