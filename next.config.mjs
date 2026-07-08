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
    return [
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
