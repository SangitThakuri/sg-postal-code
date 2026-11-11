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
      // googletagmanager.com hosts the gtag.js script itself; the actual
      // analytics beacons go to google-analytics.com via connect-src.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://*.tile.openstreetmap.org",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
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

    // Next.js gives static ("○") pages like these a 1-year default
    // Cache-Control (s-maxage=31536000). That was harmless before Workers
    // Cache existed, but now that it's enabled (wrangler.jsonc), Cloudflare
    // actually honors it — meaning any content change to these pages would
    // silently not appear at the edge for up to a year. Overriding with a
    // short, sane lifetime on every static page not already covered by the
    // /postal or /search rules below.
    const staticPageCacheControl = {
      key: "Cache-Control",
      value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    };
    const staticPagePaths = [
      "/",
      "/about",
      "/contact",
      "/privacy-policy",
      "/terms-of-service",
      "/disclaimer",
      "/cookie-policy",
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      ...staticPagePaths.map((source) => ({ source, headers: [staticPageCacheControl] })),
      {
        // Postal pages are pure functions of seed data (refreshed monthly),
        // so a day at the edge is safe. This matters beyond latency: every
        // uncached render hits D1, and on the Free plan's 5M rows/day
        // budget, Googlebot re-crawling the 121k-URL sitemap through origin
        // was what exhausted the quota and 500'd the site.
        source: "/postal/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/search",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
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
