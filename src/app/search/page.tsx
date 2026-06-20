import type { Metadata } from "next";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import PostalCard from "@/components/PostalCard";
import { searchBuildings } from "@/lib/data";

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  if (q) {
    return {
      title: `Search results for "${q}" - SG Postal Code Finder`,
      description: `Find Singapore postal codes matching "${q}". Browse buildings, addresses, and locations.`,
      robots: { index: false, follow: true },
    };
  }
  return {
    title: "Browse Singapore Postal Codes - SG Postal Code Finder",
    description: "Browse and search all Singapore postal codes by building name, road, or 6-digit code.",
    alternates: { canonical: "https://www.sgpostalcode.com/search" },
  };
}

const PAGE_SIZE = 24;

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "", page: pageStr = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageStr));

  const allResults = q ? await searchBuildings(q, 200) : [];
  const totalResults = allResults.length;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  const results = allResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasMore = totalResults > 200;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-800 font-medium">{q ? `Search: "${q}"` : "Browse"}</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {q ? (
                <>
                  Results for <span className="text-primary-600">&ldquo;{q}&rdquo;</span>
                </>
              ) : (
                "Browse Singapore Postal Codes"
              )}
            </h1>
            {q && (
              <p className="mt-1 text-sm text-gray-500">
                {totalResults > 0 ? (
                  <>
                    Found <strong>{totalResults}</strong> result{totalResults !== 1 ? "s" : ""}
                    {hasMore && " (showing top 200)"}
                    {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
                  </>
                ) : (
                  "No results found"
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-8 max-w-2xl">
        <SearchBar defaultValue={q} />
      </div>

      {/* Results */}
      {q ? (
        results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {results.map((result, i) => (
                <PostalCard key={`${result.postal}-${i}`} result={result} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(q)}&page=${page - 1}`}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    &larr; Previous
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const p = i + 1;
                    return (
                      <Link
                        key={p}
                        href={`/search?q=${encodeURIComponent(q)}&page=${p}`}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          p === page
                            ? "bg-primary-600 text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}
                  {totalPages > 7 && <span className="px-2 text-gray-400">...</span>}
                </div>
                {page < totalPages && (
                  <Link
                    href={`/search?q=${encodeURIComponent(q)}&page=${page + 1}`}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
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
              No postal codes found for &ldquo;{q}&rdquo;. Try searching with a different term, building name, or 6-digit postal code.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["018906", "238859", "049483", "orchard", "marina bay"].map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="rounded-full bg-primary-50 hover:bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        )
      ) : (
        /* Browse mode - show suggested searches */
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
                <Link
                  key={area.name}
                  href={`/search?q=${encodeURIComponent(area.q)}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 text-center font-medium text-gray-700 hover:border-primary-300 hover:text-primary-700 hover:shadow-sm transition-all text-sm"
                >
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
                  <Link
                    key={sector}
                    href={`/search?q=${sector}`}
                    className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-center text-sm font-mono font-semibold text-gray-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 transition-all"
                  >
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
