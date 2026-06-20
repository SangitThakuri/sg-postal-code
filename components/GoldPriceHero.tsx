import { TrendingUp, TrendingDown, Clock, RefreshCw } from "lucide-react";
import { MOCK_GOLD_PRICE } from "@/lib/gold-data";
import { formatNPR, formatUSD, formatNumber } from "@/lib/utils";

function StatBox({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
      <p className="text-slate-300 text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className="text-white font-bold text-lg mt-0.5">{value}</p>
      {sub && <p className="text-slate-400 text-xs mt-0.5">{sub}</p>}
    </div>
  );
}

export default function GoldPriceHero() {
  const p = MOCK_GOLD_PRICE;
  const isUp = p.change_amount >= 0;
  const changeSign = isUp ? "+" : "";
  const updatedAt = new Date(p.last_updated).toLocaleTimeString("en-NP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-10 pb-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="live-dot w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">
            Live · Updated {updatedAt}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Main price */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Today&apos;s Gold Price in Nepal
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Per Tola (11.66g) · Source: FENEGOSIDA
            </p>

            <div className="flex items-end gap-4 flex-wrap">
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">
                  24K Gold / Tola
                </p>
                <p className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                  {formatNumber(p.price_24k_tola, 0)}
                </p>
                <p className="text-gold-400 font-semibold text-sm mt-1">NPR</p>
              </div>

              <div className="pb-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
                    isUp ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400"
                  }`}
                >
                  {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {changeSign}
                  {formatNumber(p.change_amount, 0)} ({changeSign}
                  {p.change_percent.toFixed(2)}%)
                </div>
                <p className="text-slate-500 text-xs mt-1.5 text-center">vs. yesterday</p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatBox
              label="22K / Tola"
              value={`NPR ${formatNumber(p.price_22k_tola, 0)}`}
            />
            <StatBox
              label="18K / Tola"
              value={`NPR ${formatNumber(p.price_18k_tola, 0)}`}
            />
            <StatBox
              label="24K / Gram"
              value={`NPR ${formatNumber(p.price_24k_gram, 0)}`}
            />
            <StatBox
              label="XAU/USD"
              value={formatUSD(p.price_usd_per_oz)}
              sub={`USD/NPR: ${p.usd_npr_rate}`}
            />
            <StatBox
              label="Day High"
              value={`NPR ${formatNumber(p.high_24h, 0)}`}
            />
            <StatBox
              label="Day Low"
              value={`NPR ${formatNumber(p.low_24h, 0)}`}
            />
          </div>
        </div>

        {/* Last updated bar */}
        <div className="mt-8 flex items-center gap-2 text-slate-500 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: {new Date(p.last_updated).toLocaleString("en-NP")}</span>
          <span className="mx-2 text-slate-700">·</span>
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Rates refresh every 5 minutes</span>
        </div>
      </div>
    </section>
  );
}
