import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect("https://www.sgpostalcode.com/sitemap.xml", 301);
}
