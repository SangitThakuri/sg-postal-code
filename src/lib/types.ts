export interface Building {
  ADDRESS: string;
  BLK_NO: string;
  BUILDING: string;
  LATITUDE: string;
  LONGITUDE: string;
  LONGTITUDE: string;
  POSTAL: string;
  ROAD_NAME: string;
  SEARCHVAL: string;
  X: string;
  Y: string;
}

export interface PostalGroup {
  postal: string;
  buildings: Building[];
  primaryBuilding: Building;
  lat: number;
  lng: number;
}

export interface SearchResult {
  postal: string;
  buildingName: string;
  address: string;
  roadName: string;
  blkNo: string;
  lat: number;
  lng: number;
}

export interface SgDistrict {
  sector: string;
  name: string;
  areas: string[];
}
