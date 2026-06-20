#!/usr/bin/env node
/**
 * Prepares the source tree for a GitHub Pages static export build.
 * Replaces the SSR page.tsx with the client-only version so Next.js
 * does not try to run fs/path imports in the browser bundle.
 */

const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "../src/app/postal/[code]");
const SRC = path.join(DIR, "page.static.tsx");
const DST = path.join(DIR, "page.tsx");

if (!fs.existsSync(SRC)) {
  console.error(`Source not found: ${SRC}`);
  process.exit(1);
}

fs.copyFileSync(SRC, DST);

const written = fs.readFileSync(DST, "utf-8");
if (!written.includes("generateStaticParams")) {
  console.error("Copy verification failed: generateStaticParams not found in destination.");
  process.exit(1);
}
if (written.includes('"use client"')) {
  console.error('Copy verification failed: "use client" found in destination — should not be there.');
  process.exit(1);
}

console.log("prepare-ghpages: page.static.tsx → page.tsx (verified OK)");
