import { ImageResponse } from "next/og";
import { getPostalGroup, getDistrictByPostal } from "@/lib/data";

export const runtime = "nodejs";
export const alt = "Singapore Postal Code Details";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const group = await getPostalGroup(code);

  const buildingName = group
    ? group.primaryBuilding.BUILDING !== "NIL"
      ? group.primaryBuilding.BUILDING
      : group.primaryBuilding.ADDRESS
    : `Postal Code ${code}`;
  const address = group?.primaryBuilding.ADDRESS ?? "";
  const district = getDistrictByPostal(code);

  const displayName =
    buildingName.length > 55
      ? buildingName.substring(0, 52) + "..."
      : buildingName;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Top-right brand mark */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 72,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 20 20" fill="white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2C7.24 2 5 4.24 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.76-2.24-5-5-5zM10 4.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
              />
            </svg>
          </div>
          <span
            style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, fontWeight: 600 }}
          >
            SG Postal Code Finder
          </span>
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.52)",
            fontSize: 20,
            marginBottom: 20,
            fontWeight: 500,
            letterSpacing: 3,
          }}
        >
          SINGAPORE POSTAL CODE
        </div>
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: "white",
            marginBottom: 24,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 8,
          }}
        >
          {code}
        </div>
        <div
          style={{
            fontSize: 34,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 14,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          {displayName}
        </div>
        {address && (
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.52)",
              marginBottom: 36,
            }}
          >
            {address}, Singapore {code}
          </div>
        )}
        {district && (
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 50,
              padding: "10px 22px",
              color: "white",
              fontSize: 18,
              display: "inline-flex",
              alignSelf: "flex-start",
              fontWeight: 500,
            }}
          >
            {district.name}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 72,
            color: "rgba(255,255,255,0.3)",
            fontSize: 17,
            letterSpacing: 1,
          }}
        >
          sgpostalcode.com
        </div>
      </div>
    ),
    { ...size }
  );
}
