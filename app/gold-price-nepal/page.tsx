import type { Metadata } from "next";
import GoldPriceHero from "@/components/GoldPriceHero";
import GoldRatesTable from "@/components/GoldRatesTable";
import GoldChart from "@/components/GoldChart";
import SilverPriceCard from "@/components/SilverPriceCard";
import AdBanner from "@/components/AdBanner";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_GOLD_PRICE, TOLA_IN_GRAMS } from "@/lib/gold-data";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gold Price Nepal Today — 24K, 22K, 18K per Tola & Gram",
  description:
    "Today's gold price in Nepal: 24K, 22K, 18K per tola, gram, and ounce in NPR. Historical chart, price table, and FENEGOSIDA daily rates. Suna ko bhaau Nepal.",
  alternates: { canonical: "https://www.goldpricenep.com/gold-price-nepal" },
};

const UNITS = [
  { label: "Per Tola (11.66g)", gram: TOLA_IN_GRAMS },
  { label: "Per Gram", gram: 1 },
  { label: "Per 10 Gram", gram: 10 },
  { label: "Per Ounce (31.10g)", gram: 31.1035 },
  { label: "Per 100 Gram", gram: 100 },
  { label: "Per KG", gram: 1000 },
];

export default function GoldPriceNepalPage() {
  const p = MOCK_GOLD_PRICE;
  const basePerGram = p.price_24k_gram;

  return (
    <>
      <GoldPriceHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <AdBanner slot="gold-price-top" />

        {/* Today's comprehensive rate table */}
        <section>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Gold Price in Nepal Today
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {new Date().toLocaleDateString("en-NP", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            {" · "}Source: FENEGOSIDA
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left py-3.5 px-5 font-semibold text-xs uppercase tracking-wide">Unit</th>
                  <th className="text-right py-3.5 px-5 font-semibold text-xs uppercase tracking-wide">24K (₨)</th>
                  <th className="text-right py-3.5 px-5 font-semibold text-xs uppercase tracking-wide">22K (₨)</th>
                  <th className="text-right py-3.5 px-5 font-semibold text-xs uppercase tracking-wide">18K (₨)</th>
                </tr>
              </thead>
              <tbody>
                {UNITS.map(({ label, gram }, i) => (
                  <tr key={label} className={`border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                    <td className="py-4 px-5 font-medium text-gray-700">{label}</td>
                    <td className="py-4 px-5 text-right font-bold text-gray-900 tabular-nums">
                      {formatNumber(Math.round(basePerGram * gram), 0)}
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-gray-700 tabular-nums">
                      {formatNumber(Math.round(basePerGram * gram * 22 / 24), 0)}
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-gray-600 tabular-nums">
                      {formatNumber(Math.round(basePerGram * gram * 18 / 24), 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rates + history cards */}
        <GoldRatesTable />

        {/* Chart */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Historical Gold Price Chart</h2>
          <GoldChart />
        </section>

        {/* Mid ad */}
        <AdBanner slot="gold-price-mid" />

        {/* Silver */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Silver Price in Nepal</h2>
          <SilverPriceCard />
        </section>

        {/* Market info */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">About Nepal Gold Market</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-3 text-sm text-gray-600 leading-relaxed">
                <h3 className="font-semibold text-gray-900">How Nepal Sets Gold Prices</h3>
                <p>
                  Nepal&apos;s daily gold price is set by the Federation of Nepal Gold and Silver Dealers
                  Associations (FENEGOSIDA). The rate is calculated from the international spot price of
                  gold (XAU/USD), converted to NPR using the Nepal Rastra Bank&apos;s exchange rate, and
                  then adjusted for customs duty, VAT, and a dealer margin.
                </p>
                <p>
                  Prices are typically announced every morning on business days. Rates may vary slightly
                  between dealers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3 text-sm text-gray-600 leading-relaxed">
                <h3 className="font-semibold text-gray-900">Gold Measurement in Nepal</h3>
                <p>
                  The primary unit for gold pricing in Nepal is the <strong>tola</strong> (= 11.6638 grams).
                  Fine 24K gold is also sold in grams and ounces. The hallmark system used is:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>24K (999/999.9)</strong> — Fine/investment gold</li>
                  <li><strong>22K (916)</strong> — Standard jewellery gold</li>
                  <li><strong>18K (750)</strong> — Fine jewellery and rings</li>
                  <li><strong>14K (585)</strong> — Mostly imported jewellery</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdBanner slot="gold-price-bottom" />
      </div>
    </>
  );
}
