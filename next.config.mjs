/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  // Static export for GitHub Pages; undefined = default SSR for Vercel
  output: isGhPages ? "export" : undefined,
  // GitHub Pages needs trailing slashes so /postal/238859 → /postal/238859/index.html
  trailingSlash: isGhPages ? true : false,
  images: {
    unoptimized: true,
  },
  // Static header rules instead of middleware.ts: Next.js middleware is
  // broken under @opennextjs/cloudflare + Next 14 (its internal
  // getMiddlewareManifest() does a dynamic require() that Cloudflare
  // Workers can't resolve — causes every route to 500). This is a no-op
  // under output:"export" (GitHub Pages build), which is fine since these
  // headers only matter for the live Worker.
  async headers() {
    // CSP allows 'unsafe-inline' for script/style: the site renders
    // per-page JSON-LD (FAQ/Breadcrumb/Place schema) via
    // dangerouslySetInnerHTML with dynamic content, and Leaflet injects
    // inline style="" attributes for markers/popups — neither has a
    // static hash, and nonces would need middleware (broken on this
    // stack, see the Cache-Control commit). Still a real improvement:
    // default-src 'self' blocks arbitrary third-party script/frame
    // injection; only actual external resource in use (OSM map tiles)
    // is explicitly allowlisted rather than left wide open.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://*.tile.openstreetmap.org",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; ");

    const securityHeaders = [
      { key: "Content-Security-Policy", value: csp },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/postal/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/search",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

// Gives `next dev` access to local Cloudflare bindings (D1, etc.) via
// getCloudflareContext(), matching what `wrangler dev` provides after an
// opennextjs-cloudflare build. No effect on the GitHub Pages export build.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
