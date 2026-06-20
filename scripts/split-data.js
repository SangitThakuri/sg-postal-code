#!/usr/bin/env node
/**
 * Splits public/data/buildings.json into per-sector files.
 * Output: public/data/sectors/XX.json (one file per 2-digit postal prefix)
 * Used by the GitHub Pages static build so the client can fetch only the
 * relevant ~700 KB sector file instead of the full 57 MB dataset.
 */

const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "../public/data/buildings.json");
const OUTPUT_DIR = path.join(__dirname, "../public/data/sectors");

if (!fs.existsSync(INPUT)) {
  console.error("buildings.json not found. Run download-data.js first.");
  process.exit(1);
}

console.log("Splitting buildings.json into sector files…");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const buildings = JSON.parse(fs.readFileSync(INPUT, "utf-8"));
const sectors = {};

for (const b of buildings) {
  const prefix = (b.POSTAL || "").substring(0, 2);
  if (!prefix || prefix.length < 2) continue;
  if (!sectors[prefix]) sectors[prefix] = [];
  sectors[prefix].push(b);
}

for (const [prefix, data] of Object.entries(sectors)) {
  const file = path.join(OUTPUT_DIR, `${prefix}.json`);
  fs.writeFileSync(file, JSON.stringify(data));
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`  sectors/${prefix}.json  (${data.length} entries, ${kb} KB)`);
}

console.log(`Done — ${Object.keys(sectors).length} sector files written to public/data/sectors/`);
