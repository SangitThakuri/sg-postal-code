#!/usr/bin/env node
/**
 * Builds a compact search index for client-side search on GitHub Pages.
 * Output: public/data/search-index.json
 * Format: array of [postal, building, road, blkNo, address]
 *   building = "" when original value is "NIL"
 *   blkNo    = "" when original value is "NIL" or empty
 */

const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "../public/data/buildings.json");
const OUTPUT = path.join(__dirname, "../public/data/search-index.json");

if (!fs.existsSync(INPUT)) {
  console.error("buildings.json not found. Run download-data.js first.");
  process.exit(1);
}

console.log("Building search index…");
const buildings = JSON.parse(fs.readFileSync(INPUT, "utf-8"));

// Deduplicate by postal code, keeping the entry with the best building name
const byPostal = new Map();
for (const b of buildings) {
  if (!b.POSTAL || b.POSTAL.length !== 6) continue;
  const existing = byPostal.get(b.POSTAL);
  if (!existing || (existing[1] === "" && b.BUILDING !== "NIL")) {
    byPostal.set(b.POSTAL, [
      b.POSTAL,
      b.BUILDING === "NIL" ? "" : b.BUILDING,
      b.ROAD_NAME || "",
      b.BLK_NO && b.BLK_NO !== "NIL" ? b.BLK_NO : "",
      b.ADDRESS || "",
    ]);
  }
}

const index = Array.from(byPostal.values());
fs.writeFileSync(OUTPUT, JSON.stringify(index));

const kb = Math.round(fs.statSync(OUTPUT).size / 1024);
console.log(`Done — ${index.length.toLocaleString()} entries, ${kb} KB → ${OUTPUT}`);
