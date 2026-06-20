import Link from "next/link";
import type { SearchResult } from "@/lib/types";
import SgPinIcon from "./SgPinIcon";

interface PostalCardProps {
  result: SearchResult;
  compact?: boolean;
}

export default function PostalCard({ result, compact = false }: PostalCardProps) {
  if (compact) {
    return (
      <Link
        href={`/postal/${result.postal}`}
        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 hover:border-primary-300 hover:shadow-sm transition-all"
      >
        <div className="flex-shrink-0 rounded-lg bg-primary-50 px-2 py-1">
          <span className="font-mono font-bold text-primary-700 text-sm">{result.postal}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
            {result.buildingName !== "NIL" ? result.buildingName : result.address}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">{result.roadName}</p>
        </div>
        <svg className="h-4 w-4 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href={`/postal/${result.postal}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-primary-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 rounded-xl bg-primary-600 p-3">
          <SgPinIcon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-primary-700 text-lg">{result.postal}</span>
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
            {result.buildingName !== "NIL" ? result.buildingName : result.address}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">
            {result.blkNo && result.blkNo !== "NIL" ? `Blk ${result.blkNo}, ` : ""}
            {result.roadName}
          </p>
        </div>
        <svg className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-primary-600 transition-colors mt-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
}
