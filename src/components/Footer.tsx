import Link from "next/link";
import SgPinIcon from "./SgPinIcon";

const POPULAR_SEARCHES = [
  { label: "Orchard Road", href: "/search?q=orchard+road" },
  { label: "Marina Bay", href: "/search?q=marina+bay" },
  { label: "Raffles Place", href: "/search?q=raffles" },
  { label: "Changi Airport", href: "/search?q=changi+airport" },
  { label: "Jurong East", href: "/search?q=jurong+east" },
  { label: "Woodlands", href: "/search?q=woodlands" },
  { label: "Tampines", href: "/search?q=tampines" },
  { label: "Ang Mo Kio", href: "/search?q=ang+mo+kio" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 shrink-0">
                <SgPinIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">SGPostalCode.com</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Singapore&apos;s most comprehensive postal code directory — 121,000+ codes, 141,000+ buildings, with maps and full address details.
            </p>
            <p className="text-xs">
              Not affiliated with SingPost or the Singapore Government.
              See our <Link href="/disclaimer" className="underline hover:text-gray-300">Disclaimer</Link>.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Browse All Postal Codes", href: "/search" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Popular Areas</h3>
            <ul className="space-y-2.5 text-sm">
              {POPULAR_SEARCHES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-white transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Disclaimer", href: "/disclaimer" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-white mt-6 mb-3 text-sm uppercase tracking-wider">Browse Sectors</h3>
            <div className="flex flex-wrap gap-1.5">
              {["01", "09", "14", "20", "25", "31", "38", "46", "53", "59"].map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${s}`}
                  className="rounded bg-gray-800 hover:bg-primary-700 px-2 py-0.5 text-xs font-mono font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  {s}xxxx
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>&copy; {new Date().getFullYear()} SGPostalCode.com — All rights reserved</p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="hover:text-white transition-colors" target="_blank">Sitemap</Link>
            <Link href="/llms.txt" className="hover:text-white transition-colors" target="_blank">llms.txt</Link>
            <span>Built for Singapore 🇸🇬</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
