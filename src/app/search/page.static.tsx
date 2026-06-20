import { Suspense } from "react";
import SearchClientView from "@/components/SearchClientView";

export default function SearchStaticPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    }>
      <SearchClientView />
    </Suspense>
  );
}
