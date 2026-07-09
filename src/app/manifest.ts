import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SG Postal Code Finder",
    short_name: "SGPostalCode",
    description:
      "Find any Singapore postal code instantly — 121,000+ codes, 141,000+ buildings.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    // Separate "any" and "maskable" entries rather than one icon claiming
    // both purposes — a plain (non-masked) context shouldn't be told this
    // icon is specifically designed for masking. Same file works for both:
    // the pin sits ~19% inset from each edge, comfortably within the
    // maskable safe-zone convention (>=10% margin), and the background
    // already bleeds to the full canvas edge.
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
