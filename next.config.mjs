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
};

export default nextConfig;

// Gives `next dev` access to local Cloudflare bindings (D1, etc.) via
// getCloudflareContext(), matching what `wrangler dev` provides after an
// opennextjs-cloudflare build. No effect on the GitHub Pages export build.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
