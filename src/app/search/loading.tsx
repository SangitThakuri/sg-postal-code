export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-pulse" aria-busy="true" aria-label="Loading search results">
      <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
      <div className="h-8 w-72 bg-gray-200 rounded mb-8" />
      <div className="h-14 max-w-2xl bg-gray-200 rounded-xl mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-gray-100 h-24" />
        ))}
      </div>
    </div>
  );
}
