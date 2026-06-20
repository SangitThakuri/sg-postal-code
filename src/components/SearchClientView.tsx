"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PostalCard from "@/components/PostalCard";
import SearchBar from "@/components/SearchBar";
import type { SearchResult } from "@/lib/types";

type IndexEntry = [string, string, string, string, string]; // [postal, building, road, blkNo, address]

const PAGE_SIZE = 24;

function entryToResult(e: IndexEntry): SearchResult {
  return {
    postal: e[0],
    buildingName: e[1] || "NIL",
    roadName: e[2],
    blkNo: e[3] || "NIL",
    address: e[4] || e[2],
    lat: 0,
    lng: 0,
  };
}

export default function SearchClientView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = (searchParams.get("q") ?? "").trim();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));

  const [index, setIndex] = useState<IndexEntry[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch("/data/search-index.json")
      .then((r) => {
        if (!r.ok) throw new Error("index not found");
        return r.json() as Promise<IndexEntry[]>;
      })
      .then(setIndex)
      .catch(() => setLoadError(true));
  }, []);

  // If query is a 6-digit postal code, go directly to that page
  useEffect(() => {
    if (/^\d{6}$/.test(q)) {
      router.replace(`/postal/${q}`);
    }
  }, [q, router]);

  const search = useCallback(
    (query: string): SearchResult[] => {
      if (!index || !query) return [];
      const lq = query.toLowerCase();
      const hits: IndexEntry[] = [];
      for (const e of index) {
        if (
          e[0].includes(lq) ||
          e[1].toLowerCase().includes(lq) ||
          e[2].toLowerCase().includes(lq) ||
          e[4].toLowerCase().includes(lq)
        ) {
          hits.push(e);
          if (hits.length >= 200) break;
        }
      }
      return hits.map(entryToResult);
    },
    [index]
  );

  const allResults = q && !/^\d{6}$/.test(q) ? search(q) : [];
  const totalResults = allResults.length;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  const results = allResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loadError) {
    return (
      <div className="text-center py-16 text-gray-500">
        Search index could not be loaded. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-800 font-medium">{q ? `Search: "${q}"` : "Browse"}</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900">
          {q ? (
            <>Results for <span className="text-primary-600">&ldquo;{q}&rdquo;</span></>
          ) : (
            "Browse Singapore Postal Codes"
          )}
        </h1>
        {q && index && (
          <p className="mt-1 text-sm text-gray-500">
            {totalResults > 0 ? (
              <>
                Found <strong>{totalResults}</strong> result{totalResults !== 1 ? "s" : ""}
                {totalResults >= 200 && " (showing top 200)"}
                {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
              </>
            ) : (
              "No results found"
            )}
          </p>
        )}
        {q && !index && !loadError && (
          <p className="mt-1 text-sm text-gray-400">Loading search index…</p>
        )}
      </div>

      <div className="mb-8 max-w-2xl">
        <SearchBar defaultValue={q} />
      </div>

      {q && !index && !loadError && (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        </div>
      )}

      {q && index && (
        results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {results.map((result) => (
                <PostalCard key={result.postal} result={result} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {page > 1 && (
                  <Link href={`/search?q=${encodeURIComponent(q)}&page=${page - 1}`}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    &larr; Previous
                  </Link>
                )}
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <Link key={p} href={`/search?q=${encodeURIComponent(q)}&page=${p}`}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${p === page ? "bg-primary-600 text-white" : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}>
                      {p}
                    </Link>
                  );
                })}
                {totalPages > 7 && <span className="px-2 text-gray-400">…</span>}
                {page < totalPages && (
                  <Link href={`/search?q=${encodeURIComponent(q)}&page=${page + 1}`}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Next &rarr;
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              No postal codes found for &ldquo;{q}&rdquo;. Try a building name, road, or 6-digit postal code.
            </p>
          </div>
        )
      )}

      {!q && (
        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Areas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: "Orchard Road", q: "orchard road" },
                { name: "Marina Bay", q: "marina bay" },
                { name: "Raffles Place", q: "raffles" },
                { name: "Changi Airport", q: "changi airport" },
                { name: "Jurong East", q: "jurong east" },
                { name: "Tampines", q: "tampines" },
                { name: "Woodlands", q: "woodlands" },
                { name: "Bishan", q: "bishan" },
                { name: "Ang Mo Kio", q: "ang mo kio" },
                { name: "Bedok", q: "bedok" },
                { name: "Toa Payoh", q: "toa payoh" },
                { name: "Sengkang", q: "sengkang" },
              ].map((area) => (
                <Link key={area.name} href={`/search?q=${encodeURIComponent(area.q)}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 text-center font-medium text-gray-700 hover:border-primary-300 hover:text-primary-700 hover:shadow-sm transition-all text-sm">
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search by Postal Sector</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-2">
              {Array.from({ length: 83 }, (_, i) => {
                const sector = String(i + 1).padStart(2, "0");
                return (
                  <Link key={sector} href={`/search?q=${sector}`}
                    className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-center text-sm font-mono font-semibold text-gray-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 transition-all">
                    {sector}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
