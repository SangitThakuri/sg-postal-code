CREATE TABLE buildings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  postal TEXT NOT NULL,
  building TEXT NOT NULL,
  address TEXT NOT NULL,
  road_name TEXT NOT NULL,
  blk_no TEXT NOT NULL,
  searchval TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL
);

-- Exact/prefix lookups: postal/[code] pages, sitemap generation, postal-prefix search.
CREATE INDEX idx_buildings_postal ON buildings(postal);

-- Small key/value table for data-freshness info (see getDataLastModified in data.ts).
CREATE TABLE meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
