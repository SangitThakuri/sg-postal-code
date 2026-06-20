import fs from "fs";
import path from "path";
import type { Building, PostalGroup, SearchResult } from "./types";
export { SG_DISTRICTS, getDistrictByPostal, classifyBuilding, getRegionByPostal } from "./data-utils";

const DATA_URL =
  "https://raw.githubusercontent.com/xkjyeah/singapore-postal-codes/refs/heads/master/buildings.json";

// Module-level singleton — parsed once per server process lifetime
let _buildingsCache: Building[] | null = null;

async function fetchFromUrl(): Promise<Building[]> {
  const res = await fetch(DATA_URL, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error("Failed to fetch buildings data");
  return res.json();
}

export async function getAllBuildings(): Promise<Building[]> {
  if (_buildingsCache) return _buildingsCache;

  const filePath = path.join(process.cwd(), "public/data/buildings.json");
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    _buildingsCache = JSON.parse(raw) as Building[];
  } else {
    _buildingsCache = await fetchFromUrl();
  }
  return _buildingsCache;
}

export async function getBuildingsByPostal(postal: string): Promise<Building[]> {
  const all = await getAllBuildings();
  return all.filter((b) => b.POSTAL === postal);
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

  const all = await getAllBuildings();
  const seen = new Set<string>();
  const results: SearchResult[] = [];

  for (const b of all) {
    if (results.length >= limit) break;
    const key = b.POSTAL + b.BUILDING;
    if (seen.has(key)) continue;

    const matches =
      b.POSTAL.startsWith(q) ||
      b.BUILDING.toLowerCase().includes(q) ||
      b.ROAD_NAME.toLowerCase().includes(q) ||
      b.ADDRESS.toLowerCase().includes(q) ||
      b.SEARCHVAL.toLowerCase().includes(q);

    if (matches) {
      seen.add(key);
      results.push({
        postal: b.POSTAL,
        buildingName: b.BUILDING === "NIL" ? b.ADDRESS : b.BUILDING,
        address: b.ADDRESS,
        roadName: b.ROAD_NAME,
        blkNo: b.BLK_NO,
        lat: parseFloat(b.LATITUDE),
        lng: parseFloat(b.LONGITUDE),
      });
    }
  }

  return results;
}

export async function getAllPostalCodes(): Promise<string[]> {
  const all = await getAllBuildings();
  const postals = new Set(all.map((b) => b.POSTAL));
  return Array.from(postals).sort();
}

export async function getRoadNames(limit = 50): Promise<string[]> {
  const all = await getAllBuildings();
  const roads = new Set(all.map((b) => b.ROAD_NAME).filter(Boolean));
  return Array.from(roads).sort().slice(0, limit);
}

