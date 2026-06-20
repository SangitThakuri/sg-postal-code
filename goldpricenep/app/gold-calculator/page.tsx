import type { Metadata } from "next";
import GoldCalculator from "@/components/GoldCalculator";
import CurrencyConverter from "@/components/CurrencyConverter";
import AdBanner from "@/components/AdBanner";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_GOLD_PRICE, TOLA_IN_GRAMS } from "@/lib/gold-data";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gold Calculator Nepal — 24K, 22K, 18K Price per Tola, Gram, Ounce",
  description:
    "Free Nepal gold price calculator. Convert grams, tola, and ounces to NPR for 24K, 22K, and 18K gold. Live rates from FENEGOSIDA.",
  alternates: { canonical: "https://www.goldpricenep.com/gold-calculator" },
};

const COMMON_WEIGHTS = [
  { label: "1 Tola", gram: TOLA_IN_GRAMS },
  { label: "2 Tola", gram: TOLA_IN_GRAMS * 2 },
  { label: "5 Tola", gram: TOLA_IN_GRAMS * 5 },
  { label: "10 Tola", gram: TOLA_IN_GRAMS * 10 },
  { label: "1 Gram", gram: 1 },
  { label: "5 Grams", gram: 5 },
  { label: "10 Grams", gram: 10 },
  { label: "1 Ounce", gram: 31.1035 },
];

export default function GoldCalculatorPage() {
  const base = MOCK_GOLD_PRICE.price_24k_gram;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Gold Price Calculator — Nepal</h1>
        <p className="text-gray-500">
          Enter weight in grams, tola, or ounces to instantly calculate the NPR value for 24K, 22K,
          and 18K gold using today&apos;s live FENEGOSIDA rates.
        </p>
      </div>

      <AdBanner slot="calculator-top" />

      {/* Main calculator + converter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GoldCalculator />
        </div>
        <CurrencyConverter />
      </div>

      {/* Quick reference table */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Reference — Common Weights</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="text-left py-3.5 px-5 font-semibold text-xs uppercase tracking-wide">Weight</th>
                <th className="text-right py-3.5 px-5 font-semibold text-xs uppercase tracking-wide">24K (NPR)</th>
                <th className="text-right py-3.5 px-5 font-semibold text-xs uppercase tracking-wide">22K (NPR)</th>
                <th className="text-right py-3.5 px-5 font-semibold text-xs uppercase tracking-wide">18K (NPR)</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_WEIGHTS.map(({ label, gram }, i) => (
                <tr key={label} className={`border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                  <td className="py-3.5 px-5 font-semibold text-gray-700">{label}</td>
                  <td className="py-3.5 px-5 text-right font-bold text-gray-900 tabular-nums">
                    {formatNumber(Math.round(gram * base), 0)}
                  </td>
                  <td className="py-3.5 px-5 text-right font-semibold text-gray-700 tabular-nums">
                    {formatNumber(Math.round(gram * base * 22 / 24), 0)}
                  </td>
                  <td className="py-3.5 px-5 text-right font-semibold text-gray-600 tabular-nums">
                    {formatNumber(Math.round(gram * base * 18 / 24), 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-5">How to Use the Gold Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { step: "1", title: "Enter your weight", desc: "Type the gold weight in grams, tola (Nepalese unit), or troy ounces. You can fill in more than one field at once." },
            { step: "2", title: "Click Calculate", desc: "The calculator instantly computes the NPR value for 24K, 22K, and 18K gold based on today's live FENEGOSIDA rate." },
            { step: "3", title: "Read your result", desc: "Compare prices across purities. The result helps you estimate the market value before buying or selling jewellery." },
          ].map(({ step, title, desc }) => (
            <Card key={step}>
              <CardContent className="p-5">
                <div className="w-8 h-8 rounded-full bg-gold-500 text-white flex items-center justify-center font-bold text-sm mb-3">
                  {step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <AdBanner slot="calculator-bottom" />
    </div>
  );
}
