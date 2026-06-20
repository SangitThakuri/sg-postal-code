import { NextResponse } from "next/server";
import { createReadStream } from "fs";
import { join } from "path";
import { Readable } from "stream";

export async function GET() {
  const filePath = join(process.cwd(), "public", "data", "buildings.json");

  try {
    const fileStream = createReadStream(filePath);
    const webStream = Readable.toWeb(fileStream) as ReadableStream;

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
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
