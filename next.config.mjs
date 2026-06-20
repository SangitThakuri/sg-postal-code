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
