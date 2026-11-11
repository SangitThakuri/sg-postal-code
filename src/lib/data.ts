import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Building, PostalGroup, SearchResult } from "./types";
export { SG_DISTRICTS, getDistrictByPostal, classifyBuilding, getRegionByPostal } from "./data-utils";

interface BuildingRow {
  postal: string;
  building: string;
  address: string;
  road_name: string;
  blk_no: string;
  searchval: string;
  latitude: number;
  longitude: number;
}

async function getDB() {
  const { env } = await getCloudflareContext({ async: true });
  return env.DB;
}

function rowToBuilding(row: BuildingRow): Building {
  return {
    ADDRESS: row.address,
    BLK_NO: row.blk_no,
    BUILDING: row.building,
    LATITUDE: String(row.latitude),
    LONGITUDE: String(row.longitude),
    LONGTITUDE: String(row.longitude),
    POSTAL: row.postal,
    ROAD_NAME: row.road_name,
    SEARCHVAL: row.searchval,
    X: "",
    Y: "",
  };
}

let _dataLastModified: string | null = null;

export async function getDataLastModified(): Promise<string> {
  if (_dataLastModified) return _dataLastModified;
  const db = await getDB();
  const row = await db.prepare("SELECT value FROM meta WHERE key = 'data_last_modified'").first<{ value: string }>();
  _dataLastModified = row?.value ?? new Date().toISOString().split("T")[0];
  return _dataLastModified;
}

export async function getBuildingsByPostal(postal: string): Promise<Building[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT * FROM buildings WHERE postal = ?")
    .bind(postal)
    .all<BuildingRow>();
  return results.map(rowToBuilding);
}

export async function getPostalGroup(postal: string): Promise<PostalGroup | null> {
  const buildings = await getBuildingsByPostal(postal);
  if (!buildings.length) return null;

  const primary = buildings.find((b) => b.BUILDING !== "NIL") ?? buildings[0];
  return {
    postal,
    buildings,
    primaryBuilding: primary,
    lat: parseFloat(primary.LATITUDE),
    lng: parseFloat(primary.LONGITUDE),
  };
}

export async function searchBuildings(
  query: string,
  limit = 30
): Promise<SearchResult[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const db = await getDB();

  // Numeric queries are postal-prefix lookups. The multi-column LIKE scan
  // below reads all ~141k rows — D1 bills rows scanned, and on the Workers
  // Free plan's 5M rows/day budget (enforced since Sep 1, 2026) that scan
  // on every /postal page + sitemap crawl exhausted the daily quota and
  // 500'd the whole site until midnight UTC. GLOB '63*' instead walks
  // idx_buildings_postal, and DISTINCT postal + LIMIT stops after `limit`
  // index entries without touching any table rows.
  if (/^\d+$/.test(q)) {
    const { results: postalRows } = await db
      .prepare(
        "SELECT DISTINCT postal FROM buildings WHERE postal GLOB ?1 LIMIT ?2"
      )
      .bind(`${q}*`, limit)
      .all<{ postal: string }>();
    if (!postalRows.length) return [];

    const groups = await getPostalGroupsBatch(postalRows.map((r) => r.postal));
    return postalRows
      .map((r) => groups.get(r.postal))
      .filter((g): g is PostalGroup => Boolean(g))
      .map((g) => ({
        postal: g.postal,
        buildingName:
          g.primaryBuilding.BUILDING !== "NIL"
            ? g.primaryBuilding.BUILDING
            : g.primaryBuilding.ADDRESS,
        address: g.primaryBuilding.ADDRESS,
        roadName: g.primaryBuilding.ROAD_NAME,
        blkNo: g.primaryBuilding.BLK_NO,
        lat: g.lat,
        lng: g.lng,
      }));
  }

  const { results } = await db
    .prepare(
      `SELECT DISTINCT postal, building, address, road_name, blk_no, searchval, latitude, longitude
       FROM buildings
       WHERE postal LIKE ?1
          OR LOWER(building) LIKE ?2
          OR LOWER(road_name) LIKE ?2
          OR LOWER(address) LIKE ?2
          OR LOWER(searchval) LIKE ?2
       LIMIT ?3`
    )
    .bind(`${q}%`, `%${q}%`, limit)
    .all<BuildingRow>();

  return results.map((b) => ({
    postal: b.postal,
    buildingName: b.building === "NIL" ? b.address : b.building,
    address: b.address,
    roadName: b.road_name,
    blkNo: b.blk_no,
    lat: b.latitude,
    lng: b.longitude,
  }));
}

// Batch equivalent of getPostalGroup — one query with an IN(...) clause
// instead of N round trips. Returns a map keyed by postal so the caller can
// tell which of the requested codes came back empty (invalid/not found).
export async function getPostalGroupsBatch(postals: string[]): Promise<Map<string, PostalGroup>> {
  const groups = new Map<string, PostalGroup>();
  if (!postals.length) return groups;

  const db = await getDB();
  const byPostal = new Map<string, Building[]>();

  // D1 caps bound parameters per statement at 100 — a batch of more codes
  // than that (the batch-lookup UI accepts up to 500) previously blew up
  // the whole /batch page. Chunked statements keep every bind under the
  // cap while staying on the postal index.
  for (let i = 0; i < postals.length; i += 100) {
    const chunk = postals.slice(i, i + 100);
    const placeholders = chunk.map(() => "?").join(",");
    const { results } = await db
      .prepare(`SELECT * FROM buildings WHERE postal IN (${placeholders})`)
      .bind(...chunk)
      .all<BuildingRow>();

    for (const row of results) {
      const building = rowToBuilding(row);
      const arr = byPostal.get(building.POSTAL) ?? [];
      arr.push(building);
      byPostal.set(building.POSTAL, arr);
    }
  }

  byPostal.forEach((buildings, postal) => {
    const primary = buildings.find((b) => b.BUILDING !== "NIL") ?? buildings[0];
    groups.set(postal, {
      postal,
      buildings,
      primaryBuilding: primary,
      lat: parseFloat(primary.LATITUDE),
      lng: parseFloat(primary.LONGITUDE),
    });
  });
  return groups;
}

// Same GLOB filter as getPostalCodesPage/getPostalCodeCount below: the
// upstream feed has a handful of rows with postal="NIL" (same sentinel
// convention it uses for missing building names) instead of a real 6-digit
// code. Without this filter those ended up in the sitemap as /postal/NIL —
// a URL that immediately 404s (page.tsx only accepts /^\d{6}$/) and was
// tripping Google's sitemap parser.
const VALID_POSTAL_FILTER = "postal GLOB '[0-9][0-9][0-9][0-9][0-9][0-9]'";

// Distinct 6-digit postal codes in the deployed dataset (July 2026 seed).
// Only used when meta has no cached count AND the live COUNT can't run —
// which is exactly the state production is in right after this ships:
// today's D1 free-tier read budget is already too depleted for a 141k-row
// index walk. A slightly stale count only changes how many
// /postal-sitemap/N files the index lists; the meta backfill corrects it
// as soon as a COUNT succeeds (after the next midnight UTC reset).
const FALLBACK_POSTAL_CODE_COUNT = 121360;

export async function getPostalCodeCount(): Promise<number> {
  const db = await getDB();
  // COUNT(DISTINCT postal) walks the whole postal index (~141k rows read) —
  // the sitemap index route runs it on every uncached fetch, which alone
  // burned ~3% of the Free plan's daily 5M row-read budget. The count
  // changes only when the seed data does, so it's stored in meta at seed
  // time (generate-d1-seed.js) and lazily backfilled here once if absent.
  const cached = await db
    .prepare("SELECT value FROM meta WHERE key = 'postal_code_count'")
    .first<{ value: string }>();
  if (cached && !isNaN(parseInt(cached.value, 10))) {
    return parseInt(cached.value, 10);
  }

  try {
    const row = await db
      .prepare(`SELECT COUNT(DISTINCT postal) as count FROM buildings WHERE ${VALID_POSTAL_FILTER}`)
      .first<{ count: number }>();
    const count = row?.count ?? 0;
    if (count > 0) {
      await db
        .prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('postal_code_count', ?1)")
        .bind(String(count))
        .run();
      return count;
    }
  } catch {
    // Most likely the free-tier daily row-read limit rejecting a 141k-row
    // index walk — serve the sitemap from the fallback rather than 500ing.
  }
  return FALLBACK_POSTAL_CODE_COUNT;
}

// Paginated equivalent of the old getAllPostalCodes() — the sitemap route
// only ever needs one batch at a time, so fetching all ~120k codes on every
// request and slicing in JS was pure waste (and meant Google's crawler was
// triggering a full-table scan on every one of the 4 sitemap pages it
// fetches). LIMIT/OFFSET pushes the slicing into D1 instead.
export async function getPostalCodesPage(offset: number, limit: number): Promise<string[]> {
  const db = await getDB();
  const { results } = await db
    .prepare(
      `SELECT DISTINCT postal FROM buildings WHERE ${VALID_POSTAL_FILTER} ORDER BY postal LIMIT ?2 OFFSET ?1`
    )
    .bind(offset, limit)
    .all<{ postal: string }>();
  return results.map((r) => r.postal);
}

export async function getRoadNames(limit = 50): Promise<string[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT DISTINCT road_name FROM buildings WHERE road_name != '' ORDER BY road_name LIMIT ?")
    .bind(limit)
    .all<{ road_name: string }>();
  return results.map((r) => r.road_name);
}
