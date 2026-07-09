import type { SearchResult } from "./types";

const STORAGE_KEY = "sgpostalcode:recently-viewed";
const MAX_ENTRIES = 10;

export function getRecentlyViewed(): SearchResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(entry: SearchResult): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getRecentlyViewed().filter((r) => r.postal !== entry.postal);
    const updated = [entry, ...existing].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage can throw in private-browsing modes or when full — not
    // worth surfacing an error for a purely convenience feature.
  }
}
