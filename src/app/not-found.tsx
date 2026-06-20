import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-gray-100 p-6">
        <svg className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Postal Code Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The postal code you&apos;re looking for doesn&apos;t exist in our database. Please check the code and try again.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-primary">
          Go to Homepage
        </Link>
        <Link href="/search" className="btn-secondary">
          Browse All Codes
        </Link>
      </div>
    </div>
  );
}
