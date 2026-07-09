import type { Metadata } from "next";
import Link from "next/link";
import BatchLookupForm from "@/components/BatchLookupForm";
import { getPostalGroupsBatch } from "@/lib/data";

const MAX_CODES = 50;

export const metadata: Metadata = {
  title: "Batch Postal Code Lookup",
  description: "Look up multiple Singapore postal codes at once — paste up to 50 codes and get building, address, and location details for all of them.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.sgpostalcode.com/batch" },
};

interface PageProps {
  searchParams: Promise<{ codes?: string }>;
}

function parseCodes(raw: string): { codes: string[]; truncated: boolean } {
  const all = raw
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter((s) => /^\d{6}$/.test(s));
  const unique = Array.from(new Set(all));
  return {
    codes: unique.slice(0, MAX_CODES),
    truncated: unique.length > MAX_CODES,
  };
}

export default async function BatchLookupPage({ searchParams }: PageProps) {
  const { codes: rawCodes = "" } = await searchParams;
  const { codes, truncated } = parseCodes(rawCodes);
  const groups = codes.length ? await getPostalGroupsBatch(codes) : new Map();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
        <span className="text-gray-800 font-medium">Batch Lookup</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Batch Postal Code Lookup</h1>
      <p className="text-sm text-gray-500 mb-8">
        Paste up to {MAX_CODES} Singapore postal codes to look them all up at once.
      </p>

      <div className="mb-8 max-w-2xl">
        <BatchLookupForm defaultValue={rawCodes} />
      </div>

      {codes.length > 0 && (
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span>
              Found <strong>{groups.size}</strong> of <strong>{codes.length}</strong> code{codes.length !== 1 ? "s" : ""}
            </span>
            {truncated && (
              <span className="rounded-full bg-amber-50 text-amber-700 px-2.5 py-0.5 text-xs font-medium">
                Only the first {MAX_CODES} valid codes were looked up
              </span>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Postal Code</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Building / Address</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Road</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {codes.map((code) => {
                  const group = groups.get(code);
                  const b = group?.primaryBuilding;
                  return (
                    <tr key={code}>
                      <td className="px-4 py-3 font-mono font-semibold text-gray-900">
                        {group ? (
                          <Link href={`/postal/${code}`} className="text-primary-600 hover:text-primary-700 hover:underline">
                            {code}
                          </Link>
                        ) : (
                          code
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                        {b ? (b.BUILDING !== "NIL" ? b.BUILDING : b.ADDRESS) : "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 max-w-[10rem] truncate">
                        {b?.ROAD_NAME ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        {group ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-700 px-2 py-0.5 text-xs font-medium">
                            Found
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-500 px-2 py-0.5 text-xs font-medium">
                            Not found
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {rawCodes && codes.length === 0 && (
        <p className="text-sm text-gray-500">
          No valid 6-digit postal codes found in what you entered. Separate codes with commas, spaces, or new lines.
        </p>
      )}
    </div>
  );
}
