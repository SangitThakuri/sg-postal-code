"use client";

import { useEffect, useState } from "react";
import { getRecentlyViewed } from "@/lib/recentlyViewed";
import type { SearchResult } from "@/lib/types";
import PostalCard from "./PostalCard";

interface RecentlyViewedListProps {
  // Homepage renders its own full-bleed section+container; pages that
  // already provide their own container (e.g. /search) want just the
  // heading+grid without a nested section wrapper.
  bare?: boolean;
}

export default function RecentlyViewedList({ bare = false }: RecentlyViewedListProps) {
  const [items, setItems] = useState<SearchResult[] | null>(null);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);

  // null = not yet read from localStorage (avoids a hydration flash);
  // empty array = read, but nothing to show yet. Either way, render
  // nothing at all — including any wrapper — so a first-time visitor
  // doesn't get an empty padded gap on the page.
  if (!items || items.length === 0) return null;

  const content = (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <PostalCard key={item.postal} result={item} compact />
        ))}
      </div>
    </>
  );

  if (bare) return <div>{content}</div>;

  return (
    <section className="py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{content}</div>
    </section>
  );
}
