#!/usr/bin/env node
/**
 * Prepares the source tree for a GitHub Pages (output: export) build.
 *
 * What it does:
 *  1. Replaces postal/[code]/page.tsx with the client-only version
 *     (server version uses fs/path which can't run in the browser).
 *  2. Replaces search/page.tsx with the client-only version
 *     (server version calls searchBuildings() which needs Node.js).
 *  3. Removes src/app/api/ — not needed; sector JSON files serve the data.
 *  4. Removes src/app/sitemap-index/ — returns a 301 redirect which is
 *     not supported by static export.
 */

const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "../src/app");

// ── 1. postal/[code]/page.tsx ────────────────────────────────────────────────
const postalDir  = path.join(APP, "postal/[code]");
const postalSrc  = path.join(postalDir, "page.static.tsx");
const postalDst  = path.join(postalDir, "page.tsx");

if (!fs.existsSync(postalSrc)) {
  console.error(`Missing: ${postalSrc}`);
  process.exit(1);
}
fs.copyFileSync(postalSrc, postalDst);
verify(postalDst, "postal page");

// ── 2. search/page.tsx ───────────────────────────────────────────────────────
const searchDir  = path.join(APP, "search");
const searchSrc  = path.join(searchDir, "page.static.tsx");
const searchDst  = path.join(searchDir, "page.tsx");

if (!fs.existsSync(searchSrc)) {
  console.error(`Missing: ${searchSrc}`);
  process.exit(1);
}
fs.copyFileSync(searchSrc, searchDst);
// search page.static.tsx is a Server Component wrapper — no "use client" check needed
console.log("prepare-ghpages: search/page.static.tsx → search/page.tsx (OK)");

// ── 3. Remove src/app/api/ ───────────────────────────────────────────────────
const apiDir = path.join(APP, "api");
if (fs.existsSync(apiDir)) {
  fs.rmSync(apiDir, { recursive: true, force: true });
  console.log("prepare-ghpages: removed src/app/api/ (not needed in static export)");
}

// ── 4. Remove src/app/sitemap-index/ ────────────────────────────────────────
const sitemapIndexDir = path.join(APP, "sitemap-index");
if (fs.existsSync(sitemapIndexDir)) {
  fs.rmSync(sitemapIndexDir, { recursive: true, force: true });
  console.log("prepare-ghpages: removed src/app/sitemap-index/ (redirect not supported in static export)");
}

console.log("prepare-ghpages: all steps complete.");

// ── helpers ──────────────────────────────────────────────────────────────────
function verify(filePath, label) {
  const content = fs.readFileSync(filePath, "utf-8");

  if (!content.includes("generateStaticParams") && label === "postal page") {
    console.error(`Verification failed [${label}]: generateStaticParams not found.`);
    process.exit(1);
  }

  // Detect "use client" as a standalone directive line (not inside a comment)
  const hasClientDirective = content.split("\n").some((line) => {
    const t = line.trim();
    return t === '"use client";' || t === "'use client';" ||
           t === '"use client"'  || t === "'use client'";
  });
  if (hasClientDirective) {
    console.error(`Verification failed [${label}]: "use client" directive must not be in the Server Component wrapper.`);
    process.exit(1);
  }

  console.log(`prepare-ghpages: ${label} OK`);
}
