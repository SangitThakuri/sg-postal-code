import fs from "fs";
import path from "path";
import type { Building, PostalGroup, SearchResult } from "./types";

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

// Singapore postal districts
export const SG_DISTRICTS = [
  { sector: "01-08", name: "City & Central Business District", prefix: ["01", "02", "03", "04", "05", "06", "07", "08"] },
  { sector: "09-10", name: "Orchard, River Valley", prefix: ["09", "10"] },
  { sector: "11-13", name: "Novena, Toa Payoh, Thomson", prefix: ["11", "12", "13"] },
  { sector: "14-16", name: "Geylang, Eunos, Katong", prefix: ["14", "15", "16"] },
  { sector: "17-19", name: "Loyang, Changi, Tampines", prefix: ["17", "18", "19"] },
  { sector: "20-21", name: "Bishan, Ang Mo Kio", prefix: ["20", "21"] },
  { sector: "22-23", name: "Jurong, Buona Vista", prefix: ["22", "23"] },
  { sector: "25-28", name: "Yishun, Sembawang, Woodlands", prefix: ["25", "26", "27", "28"] },
  { sector: "31-33", name: "Bukit Timah, Clementi", prefix: ["31", "32", "33"] },
  { sector: "34-37", name: "Serangoon, Hougang, Punggol", prefix: ["34", "35", "36", "37"] },
  { sector: "38-42", name: "Sengkang, Pasir Ris", prefix: ["38", "39", "40", "41", "42"] },
  { sector: "43-45", name: "Bukit Merah, Queenstown", prefix: ["43", "44", "45"] },
  { sector: "46-52", name: "Bedok, Simei, Tampines", prefix: ["46", "47", "48", "49", "50", "51", "52"] },
  { sector: "53-58", name: "Choa Chu Kang, Bukit Panjang", prefix: ["53", "54", "55", "56", "57", "58"] },
  { sector: "59-67", name: "Jurong West, Boon Lay", prefix: ["59", "60", "61", "62", "63", "64", "65", "66", "67"] },
  { sector: "68-71", name: "Lim Chu Kang, Tengah", prefix: ["68", "69", "70", "71"] },
  { sector: "72-73", name: "Tuas", prefix: ["72", "73"] },
  { sector: "75-81", name: "Punggol, Sengkang North", prefix: ["75", "76", "77", "78", "79", "80", "81"] },
  { sector: "82-83", name: "Sentosa, Southern Islands", prefix: ["82", "83"] },
];

export function getDistrictByPostal(postal: string) {
  const prefix = postal.substring(0, 2);
  return SG_DISTRICTS.find((d) => d.prefix.includes(prefix)) ?? null;
}

export function classifyBuilding(building: string, searchval = ""): string {
  const n = (building + " " + searchval).toUpperCase();
  if (n.includes("MRT") || n.includes("LRT") || n.includes("BUS INTERCHANGE") || n.includes("BUS TERMINAL")) return "MRT / Transport Station";
  if (n.includes("AIRPORT") || n.includes("CHANGI AVIATION")) return "Airport";
  if (n.includes("HOSPITAL") || n.includes("MEDICAL CENTRE") || n.includes("HEALTH CENTRE") || n.includes("POLYCLINIC")) return "Healthcare";
  if (n.includes("SCHOOL") || n.includes("UNIVERSITY") || n.includes("COLLEGE") || n.includes("POLYTECHNIC") || n.includes("INSTITUTE OF")) return "Educational Institution";
  if (n.includes("MALL") || n.includes("SHOPPING") || n.includes("SQUARE") || n.includes("PLAZA") || n.includes("ARCADE")) return "Shopping Mall / Retail";
  if (n.includes("CONDOMINIUM") || n.includes("CONDO") || n.includes("RESIDENCES") || n.includes("APARTMENTS") || n.includes("SUITES")) return "Private Residential";
  if (n.includes("HOTEL") || n.includes("RESORT") || n.includes("INN") || n.includes("HOSTEL") || n.includes("SERVICED APARTMENT")) return "Hotel / Accommodation";
  if (n.includes("INDUSTRIAL") || n.includes("FACTORY") || n.includes("WAREHOUSE") || n.includes("LOGISTICS") || n.includes("TECHPARK")) return "Industrial / Logistics";
  if (n.includes("CHURCH") || n.includes("MOSQUE") || n.includes("TEMPLE") || n.includes("SYNAGOGUE") || n.includes("CATHEDRAL") || n.includes("CHAPEL")) return "Religious Building";
  if (n.includes("MINISTRY") || n.includes("AUTHORITY") || n.includes("GOVERNMENT") || n.includes("AGENCY") || n.includes("PARLIAMENT")) return "Government / Public Sector";
  if (n.includes("TOWER") || n.includes("OFFICE") || n.includes("CENTRE") || n.includes("BUILDING") || n.includes("HOUSE")) return "Commercial / Office";
  if (n.includes("PARK") || n.includes("GARDEN") || n.includes("NATURE RESERVE") || n.includes("RESERVOIR")) return "Park / Green Space";
  if (n.includes("CLUB") || n.includes("SPORT") || n.includes("STADIUM") || n.includes("ARENA") || n.includes("GYM")) return "Sports / Recreation";
  if (n === "NIL" || n.trim() === "") return "Residential / HDB";
  return "Commercial / Mixed Use";
}

export function getRegionByPostal(postal: string): string {
  const s = parseInt(postal.substring(0, 2), 10);
  if (s <= 8) return "Central Region (Downtown Core)";
  if (s <= 10) return "Central Region (Orchard / River Valley)";
  if (s <= 13) return "Central Region (Novena / Toa Payoh)";
  if (s <= 16) return "East Region (Geylang / Katong)";
  if (s <= 19) return "East Region (Changi / Tampines)";
  if (s <= 21) return "North-East Region (Ang Mo Kio / Bishan)";
  if (s <= 23) return "West Region (Jurong / Buona Vista)";
  if (s <= 28) return "North Region (Yishun / Woodlands / Sembawang)";
  if (s <= 33) return "West Region (Bukit Timah / Clementi)";
  if (s <= 37) return "North-East Region (Serangoon / Hougang)";
  if (s <= 42) return "North-East Region (Sengkang / Pasir Ris)";
  if (s <= 45) return "Central Region (Bukit Merah / Queenstown)";
  if (s <= 52) return "East Region (Bedok / Simei)";
  if (s <= 58) return "West Region (Choa Chu Kang / Bukit Panjang)";
  if (s <= 67) return "West Region (Jurong West / Boon Lay)";
  if (s <= 71) return "North Region (Lim Chu Kang / Tengah)";
  if (s <= 73) return "West Region (Tuas)";
  if (s <= 83) return "North-East Region (Punggol / Sengkang)";
  return "Singapore";
}
