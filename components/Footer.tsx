import Link from "next/link";
import { TrendingUp } from "lucide-react";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gold-price-nepal", label: "Gold Price Nepal" },
  { href: "/gold-calculator", label: "Gold Calculator" },
  { href: "/gold-news", label: "Gold News" },
];

const LEGAL_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-white text-lg">
                GoldPriceNep<span className="text-gold-400">.com</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Nepal&apos;s trusted source for live gold prices, calculators, and market insights.
              Rates based on FENEGOSIDA daily announcements.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Disclaimer: Prices shown are indicative. Always verify with your local jeweller or
              bank before transactions.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-gold-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-gold-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Data Source
              </h5>
              <p className="text-slate-500 text-xs">
                FENEGOSIDA · Nepal Rastra Bank · International Spot Market
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {year} GoldPriceNep.com. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Prices in NPR · Updated daily
          </p>
        </div>
      </div>
    </footer>
  );
}
