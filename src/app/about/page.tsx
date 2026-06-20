import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — SG Postal Code Finder",
  description: "Learn about SGPostalCode.com — Singapore's comprehensive postal code search tool covering 121,000+ postal codes and 141,000+ buildings.",
  alternates: { canonical: "https://www.sgpostalcode.com/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="mb-8">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
          <span className="text-gray-800 font-medium">About Us</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">About SGPostalCode.com</h1>
        <p className="text-lg text-gray-500">Singapore's most comprehensive postal code search directory</p>
      </div>

      <div className="space-y-8">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What We Do</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong>SGPostalCode.com</strong> is a free, comprehensive online directory for Singapore postal codes.
              We provide instant lookup of any of Singapore's 121,000+ unique postal codes, covering over 141,000
              buildings, estates, MRT stations, government buildings, shopping malls, schools, hospitals, and more.
            </p>
            <p>
              Our goal is simple: help residents, businesses, delivery services, tourists, and developers quickly
              find the correct 6-digit Singapore postal code for any address — or find the address behind any postal code.
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What You Can Do Here</h2>
          <ul className="space-y-3">
            {[
              { icon: "🔍", title: "Search by Postal Code", desc: "Enter any 6-digit Singapore postal code to get the building name, full address, road, block number, GPS coordinates, and an interactive map." },
              { icon: "🏢", title: "Search by Building Name", desc: "Type a building, landmark, or MRT station name to instantly find its postal code and address." },
              { icon: "🛣️", title: "Search by Road Name", desc: "Enter a road or street name to browse all postal codes along that road." },
              { icon: "🗺️", title: "Interactive Maps", desc: "Every postal code page includes an OpenStreetMap-powered interactive map showing the exact location of the building." },
              { icon: "📍", title: "Explore by District", desc: "Browse Singapore's 28 postal districts from the CBD to Jurong, Woodlands, Changi, and Punggol." },
              { icon: "📋", title: "Copy & Share", desc: "Easily share any postal code page via URL — each page has a permanent, SEO-friendly address." },
            ].map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Data</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Our postal code database is sourced from Singapore's official building address records and is updated
              regularly to reflect new developments, building renames, and address changes. The dataset covers
              the entire island of Singapore, including:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>HDB public housing blocks and estates</li>
              <li>Private condominiums and apartments</li>
              <li>Commercial buildings, offices, and shopping malls</li>
              <li>Government buildings, ministries, and statutory boards</li>
              <li>MRT, LRT, and bus interchange stations</li>
              <li>Schools, polytechnics, universities, and educational institutions</li>
              <li>Hospitals, polyclinics, and healthcare facilities</li>
              <li>Hotels, serviced apartments, and hospitality venues</li>
              <li>Industrial parks, warehouses, and logistics hubs</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">About Singapore Postal Codes</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Singapore uses a <strong>6-digit postal code system</strong> introduced by SingPost in 1995. Unlike
              postal codes in many other countries that cover wide areas, Singapore's postal codes are highly
              specific — typically pointing to a single building or a small cluster of buildings.
            </p>
            <p>
              The first two digits of a Singapore postal code indicate the <strong>postal sector</strong>, which
              corresponds to a general geographic area. For example, postal codes beginning with 01–08 cover the
              City and Central Business District, while codes starting with 75–81 cover the Punggol and Sengkang
              North areas.
            </p>
            <p>
              Singapore has <strong>83 postal sectors</strong> covering the entire island. Postal codes are widely
              used in delivery logistics, e-commerce, government forms, property listings, and navigation apps.
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-sm text-gray-600 mb-4">
            Have feedback, corrections, or data update requests? We&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          SGPostalCode.com is an independent directory and is not affiliated with SingPost, the Singapore
          Government, or any government agency. All data is provided for informational purposes only.
          See our <Link href="/disclaimer" className="underline hover:text-gray-600">Disclaimer</Link> for details.
        </p>
      </div>
    </div>
  );
}
