import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_GOLD_PRICE } from "@/lib/gold-data";
import { formatNumber } from "@/lib/utils";

export default function SilverPriceCard() {
  const p = MOCK_GOLD_PRICE;
  const isUp = p.silver_change_amount >= 0;
  const sign = isUp ? "+" : "";

  const silverOunce = Math.round(p.silver_per_gram * 31.1035);
  const silver22 = Math.round(p.silver_per_tola * 22 / 24);
  const silver18 = Math.round(p.silver_per_tola * 18 / 24);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Silver Price Nepal</CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date().toLocaleDateString("en-NP", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
              isUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            }`}
          >
            {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {sign}NPR {p.silver_change_amount} ({sign}{p.silver_change_percent.toFixed(2)}%)
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Fine Silver / Tola", value: p.silver_per_tola },
            { label: "Fine Silver / Gram", value: p.silver_per_gram },
            { label: "Sterling (925) / Tola", value: silver22 },
            { label: "Silver / Ounce", value: silverOunce },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-xl px-4 py-3">
              <p className="text-xs text-slate-500 font-medium leading-tight">{item.label}</p>
              <p className="text-base font-bold text-slate-900 tabular-nums mt-1">
                ₨ {formatNumber(item.value, 0)}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Silver prices are indicative. Contact your local bullion dealer for transaction rates.
        </p>
      </CardContent>
    </Card>
  );
}
