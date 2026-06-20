import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SG Postal Code Finder — Singapore's Postal Code Directory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            width: 96,
            height: 96,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 20 20" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2C7.24 2 5 4.24 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.76-2.24-5-5-5zM10 4.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
            letterSpacing: -1,
          }}
        >
          SG Postal Code Finder
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.72)",
            marginBottom: 44,
          }}
        >
          Singapore's Most Comprehensive Postal Code Directory
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["121,000+ Postal Codes", "141,000+ Buildings", "All 28 Districts"].map(
            (text) => (
              <div
                key={text}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 50,
                  padding: "10px 22px",
                  color: "white",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {text}
              </div>
            )
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 36,
            color: "rgba(255,255,255,0.38)",
            fontSize: 18,
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
