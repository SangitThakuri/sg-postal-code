#!/usr/bin/env node
/**
 * Converts public/data/buildings.json into per-sector SQL seed files for the
 * D1 `buildings` table (see migrations/0001_create_buildings.sql).
 * Output: d1-seed/XX.sql (one file per 2-digit postal prefix), gitignored —
 * regenerated from buildings.json at deploy time, same as public/data/sectors/.
 *
 * Run: node scripts/generate-d1-seed.js
 * Then: wrangler d1 execute <db-name> --remote --file=d1-seed/XX.sql   (per file)
 */

const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "../public/data/buildings.json");
const OUTPUT_DIR = path.join(__dirname, "../d1-seed");
const ROWS_PER_INSERT = 300;

if (!fs.existsSync(INPUT)) {
  console.error("buildings.json not found. Run download-data.js first.");
  process.exit(1);
}

function sqlString(value) {
  return `'${String(value ?? "").replace(/'/g, "''")}'`;
}

console.log("Reading buildings.json…");
const buildings = JSON.parse(fs.readFileSync(INPUT, "utf-8"));

const sectors = {};
for (const b of buildings) {
  const prefix = (b.POSTAL || "").substring(0, 2);
  if (!prefix || prefix.length < 2) continue;
  if (!sectors[prefix]) sectors[prefix] = [];
  sectors[prefix].push(b);
}

fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let totalRows = 0;
for (const [prefix, rows] of Object.entries(sectors)) {
  const statements = [];
  for (let i = 0; i < rows.length; i += ROWS_PER_INSERT) {
    const chunk = rows.slice(i, i + ROWS_PER_INSERT);
    const values = chunk
      .map(
        (b) =>
          `(${sqlString(b.POSTAL)}, ${sqlString(b.BUILDING)}, ${sqlString(b.ADDRESS)}, ${sqlString(b.ROAD_NAME)}, ${sqlString(b.BLK_NO)}, ${sqlString(b.SEARCHVAL)}, ${parseFloat(b.LATITUDE) || 0}, ${parseFloat(b.LONGITUDE) || 0})`
      )
      .join(",\n  ");
    statements.push(
      `INSERT INTO buildings (postal, building, address, road_name, blk_no, searchval, latitude, longitude) VALUES\n  ${values};`
    );
  }
  const file = path.join(OUTPUT_DIR, `${prefix}.sql`);
  fs.writeFileSync(file, statements.join("\n\n") + "\n");
  totalRows += rows.length;
  console.log(`  d1-seed/${prefix}.sql  (${rows.length} rows, ${statements.length} statements)`);
}

const today = new Date().toISOString().split("T")[0];
fs.writeFileSync(
  path.join(OUTPUT_DIR, "_meta.sql"),
  `INSERT OR REPLACE INTO meta (key, value) VALUES ('data_last_modified', ${sqlString(today)});\n`
);

console.log(`Done — ${totalRows.toLocaleString()} rows across ${Object.keys(sectors).length} sector files written to d1-seed/`);
