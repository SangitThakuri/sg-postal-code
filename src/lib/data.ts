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

export async function getAllPostalCodes(): Promise<string[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT DISTINCT postal FROM buildings ORDER BY postal")
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
