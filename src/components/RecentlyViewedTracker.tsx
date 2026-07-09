"use client";

import { useEffect } from "react";
import { addRecentlyViewed } from "@/lib/recentlyViewed";
import type { SearchResult } from "@/lib/types";

export default function RecentlyViewedTracker({ entry }: { entry: SearchResult }) {
  useEffect(() => {
    addRecentlyViewed(entry);
    // Only re-run if the postal code itself changes, not on every
    // re-render (entry is a fresh object each render since it's built
    // inline in the server component).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.postal]);

  return null;
}
