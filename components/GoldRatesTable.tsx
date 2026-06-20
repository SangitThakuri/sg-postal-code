import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_GOLD_PRICE, getPriceHistory } from "@/lib/gold-data";
import { formatNumber } from "@/lib/utils";

function PurityRow({
  label,
  purity,
  perTola,
  perGram,
}: {
  label: string;
  purity: string;
  perTola: number;
  perGram: number;
}) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td className="py-3.5 px-4">
        <span className="font-bold text-gray-900">{label}</span>
        <span className="ml-2 text-xs text-gray-400">{purity}</span>
      </td>
      <td className="py-3.5 px-4 text-right font-semibold text-gray-900 tabular-nums">
        NPR {formatNumber(perTola, 0)}
      </td>
      <td className="py-3.5 px-4 text-right font-semibold text-gray-700 tabular-nums">
        NPR {formatNumber(perGram, 0)}
      </td>
    </tr>
  );
}

export default function GoldRatesTable() {
  const p = MOCK_GOLD_PRICE;
  const history = getPriceHistory();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Today's rates */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Gold Rates</CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">
            {new Date().toLocaleDateString("en-NP", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Purity
                </th>
                <th className="text-right py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Per Tola
                </th>
                <th className="text-right py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Per Gram
                </th>
              </tr>
            </thead>
            <tbody>
              <PurityRow label="24K" purity="999.9" perTola={p.price_24k_tola} perGram={p.price_24k_gram} />
              <PurityRow label="22K" purity="916" perTola={p.price_22k_tola} perGram={p.price_22k_gram} />
              <PurityRow label="18K" purity="750" perTola={p.price_18k_tola} perGram={p.price_18k_gram} />
            </tbody>
          </table>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-gold-50 rounded-lg px-3 py-2.5">
              <p className="text-xs text-gold-700 font-medium">Per Ounce (24K)</p>
              <p className="font-bold text-gold-900 tabular-nums text-sm mt-0.5">
                NPR {formatNumber(p.price_24k_gram * 31.1035, 0)}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg px-3 py-2.5">
              <p className="text-xs text-slate-600 font-medium">XAU / USD</p>
              <p className="font-bold text-slate-900 tabular-nums text-sm mt-0.5">
                ${formatNumber(p.price_usd_per_oz, 2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-day history */}
      <Card>
        <CardHeader>
          <CardTitle>Price History (7 Days)</CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">24K Gold per Tola in NPR</p>
        </CardHeader>
        <CardContent className="pt-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="text-right py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">24K</th>
                <th className="text-right py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Change</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-700 text-xs">{row.date}</td>
                  <td className="py-3 px-4 text-right font-semibold tabular-nums text-gray-900">
                    {formatNumber(row.price_24k, 0)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {i === 0 ? (
                      <span className="text-xs text-gray-400">—</span>
                    ) : (
                      <span
                        className={`flex items-center justify-end gap-1 text-xs font-semibold ${
                          row.change >= 0 ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {row.change >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {row.change >= 0 ? "+" : ""}
                        {formatNumber(row.change, 0)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
