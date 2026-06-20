import Link from "next/link";
import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import { SG_DISTRICTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "SG Postal Code Finder - Search Singapore Postal Codes",
  description:
    "Find any Singapore postal code instantly. Search by 6-digit postal code, building name, or road name. Get full address, location on map, and more.",
};

const POPULAR_SEARCHES = [
  { label: "Orchard Road", href: "/search?q=orchard+road" },
  { label: "Marina Bay", href: "/search?q=marina+bay" },
  { label: "Raffles Place", href: "/search?q=raffles" },
  { label: "Changi Airport", href: "/search?q=changi+airport" },
  { label: "HarbourFront", href: "/search?q=harbourfront" },
  { label: "Jurong East", href: "/search?q=jurong+east" },
  { label: "Woodlands", href: "/search?q=woodlands" },
  { label: "Tampines", href: "/search?q=tampines" },
];

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    title: "Instant Search",
    desc: "Search by postal code, building name, or road name and get results instantly.",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: "Interactive Maps",
    desc: "View exact location of any postal code on an interactive map with street-level detail.",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Complete Building Data",
    desc: "Access full building names, block numbers, addresses, and coordinates for every postal code.",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    title: "All 28 Districts",
    desc: "Browse postal codes across all Singapore districts — from CBD to Jurong, Woodlands to Changi.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            100,000+ Singapore Buildings
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Singapore Postal Code Finder
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Search any Singapore postal code, building name, or road to get the full address, location details, and an interactive map.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar large />
          </div>

          {/* Popular searches */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-primary-300">Popular:</span>
            {POPULAR_SEARCHES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-sm text-white transition-colors backdrop-blur-sm"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60H1440V20C1200 60 960 0 720 0C480 0 240 60 0 20V60Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="card text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How to Find a Singapore Postal Code</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Three ways to look up Singapore postal codes and address information
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Search by Postal Code",
                desc: 'Enter a 6-digit Singapore postal code (e.g., "018906") to get the full address and building information.',
                example: "Try: 018906, 238859, 049483",
              },
              {
                step: "2",
                title: "Search by Building Name",
                desc: 'Type a building or landmark name (e.g., "Marina Bay Sands") to find its postal code and location.',
                example: "Try: Marina Bay, Changi Airport",
              },
              {
                step: "3",
                title: "Search by Road Name",
                desc: 'Enter a road or street name (e.g., "Orchard Road") to browse all postal codes along that road.',
                example: "Try: Orchard Road, Raffles Place",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-primary-600 font-medium">{item.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Singapore District</h2>
            <p className="mt-3 text-gray-500">
              Singapore is divided into postal sectors. Click a district to explore postal codes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SG_DISTRICTS.map((district) => (
              <Link
                key={district.sector}
                href={`/search?q=${encodeURIComponent(district.prefix[0])}`}
                className="card flex items-center gap-4 hover:border-primary-300 hover:shadow-md transition-all group border border-gray-100"
              >
                <div className="flex-shrink-0 rounded-lg bg-primary-50 px-3 py-2 text-center min-w-[60px]">
                  <span className="font-mono font-bold text-primary-700 text-sm">{district.sector}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-primary-700 transition-colors text-sm">
                    {district.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Sectors {district.sector}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Singapore Postal Codes */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">About Singapore Postal Codes</h2>
          </div>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-4 text-sm leading-relaxed">
            <p>
              Singapore uses a <strong>6-digit postal code system</strong> introduced in 1995 by SingPost. Every building and address in Singapore has a unique 6-digit postal code that identifies its precise location.
            </p>
            <p>
              The <strong>first two digits</strong> of a Singapore postal code indicate the <strong>postal sector</strong> (or district), which corresponds to a general geographic area. For example, postal codes starting with 01–08 are in the City and Central Business District area, while codes starting with 17–19 cover Loyang, Changi, and Tampines.
            </p>
            <p>
              Singapore has <strong>28 postal districts</strong> covering the entire island. Singapore postal codes are used by SingPost for mail delivery, by delivery companies for logistics, and by businesses for customer address validation. They are also commonly used in property listings, government forms, and e-commerce checkouts.
            </p>
            <p>
              Unlike some countries where a postal code covers a wide area, Singapore&apos;s postal codes are highly specific — typically corresponding to a single building or a small cluster of buildings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
