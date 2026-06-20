export interface GoldPrice {
  price_24k_tola: number;
  price_22k_tola: number;
  price_18k_tola: number;
  price_24k_gram: number;
  price_22k_gram: number;
  price_18k_gram: number;
  price_usd_per_oz: number;
  usd_npr_rate: number;
  change_amount: number;
  change_percent: number;
  high_24h: number;
  low_24h: number;
  silver_per_tola: number;
  silver_per_gram: number;
  silver_change_amount: number;
  silver_change_percent: number;
  last_updated: string;
}

export interface HistoricalPoint {
  time: string;
  price: number;
}

export type TimePeriod = "1D" | "7D" | "30D" | "1Y";

// ─── Constants ────────────────────────────────────────────────
export const TOLA_IN_GRAMS = 11.6638;
export const TROY_OZ_IN_GRAMS = 31.1035;

// ─── Mock live price (swap for real API call in production) ───
export const MOCK_GOLD_PRICE: GoldPrice = {
  price_24k_tola: 191800,
  price_22k_tola: 175983,
  price_18k_tola: 143850,
  price_24k_gram: 16443,
  price_22k_gram: 15073,
  price_18k_gram: 12332,
  price_usd_per_oz: 3709,
  usd_npr_rate: 137.85,
  change_amount: 1450,
  change_percent: 0.76,
  high_24h: 192500,
  low_24h: 190100,
  silver_per_tola: 2285,
  silver_per_gram: 196,
  silver_change_amount: 35,
  silver_change_percent: 1.55,
  last_updated: new Date().toISOString(),
};

// ─── Historical data generators ───────────────────────────────
function seed(base: number, i: number, volatility: number): number {
  const pseudo = Math.sin(i * 9301 + 49297) * 233280;
  const rand = (pseudo - Math.floor(pseudo)) * 2 - 1;
  return Math.round(base + rand * volatility);
}

export function generateHistory(period: TimePeriod): HistoricalPoint[] {
  const now = new Date();
  const points: HistoricalPoint[] = [];

  if (period === "1D") {
    const base = 191000;
    for (let h = 23; h >= 0; h--) {
      const d = new Date(now);
      d.setHours(now.getHours() - h, 0, 0, 0);
      points.push({
        time: d.toLocaleTimeString("en-NP", { hour: "2-digit", minute: "2-digit" }),
        price: seed(base, h, 800),
      });
    }
    points[points.length - 1].price = 191800;
  } else if (period === "7D") {
    const base = 189500;
    for (let d = 6; d >= 0; d--) {
      const dt = new Date(now);
      dt.setDate(now.getDate() - d);
      points.push({
        time: dt.toLocaleDateString("en-NP", { month: "short", day: "numeric" }),
        price: seed(base + d * 300, d, 1200),
      });
    }
    points[points.length - 1].price = 191800;
  } else if (period === "30D") {
    const startBase = 182000;
    for (let d = 29; d >= 0; d--) {
      const dt = new Date(now);
      dt.setDate(now.getDate() - d);
      const trend = ((29 - d) / 29) * 9800;
      points.push({
        time: dt.toLocaleDateString("en-NP", { month: "short", day: "numeric" }),
        price: seed(startBase + trend, d, 1800),
      });
    }
    points[points.length - 1].price = 191800;
  } else {
    const startBase = 155000;
    for (let w = 51; w >= 0; w--) {
      const dt = new Date(now);
      dt.setDate(now.getDate() - w * 7);
      const trend = ((51 - w) / 51) * 36800;
      points.push({
        time: dt.toLocaleDateString("en-NP", { month: "short", day: "numeric" }),
        price: seed(startBase + trend, w, 3500),
      });
    }
    points[points.length - 1].price = 191800;
  }

  return points;
}

// ─── Price table rows (last 7 days) ────────────────────────────
export interface PriceTableRow {
  date: string;
  price_24k: number;
  price_22k: number;
  price_18k: number;
  change: number;
}

export function getPriceHistory(): PriceTableRow[] {
  const today = MOCK_GOLD_PRICE.price_24k_tola;
  const deltas = [0, -1450, +820, -300, +1100, -650, +2200];
  return deltas.map((delta, i) => {
    const dt = new Date();
    dt.setDate(dt.getDate() - i);
    const p24 = today + deltas.slice(0, i + 1).reduce((a, b) => a - b, 0);
    return {
      date: dt.toLocaleDateString("en-NP", { weekday: "short", month: "short", day: "numeric" }),
      price_24k: p24,
      price_22k: Math.round(p24 * 22 / 24),
      price_18k: Math.round(p24 * 18 / 24),
      change: i === 0 ? 1450 : -deltas[i],
    };
  });
}

// ─── News articles ─────────────────────────────────────────────
export interface NewsArticle {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "gold-price-nepal-june-2026",
    title: "Gold Price in Nepal Hits Record High of NPR 1,91,800 per Tola",
    summary: "Nepal's gold market reached a new milestone today as FENEGOSIDA announced the 24-karat gold price at NPR 1,91,800 per tola, reflecting global bullion market trends and rupee depreciation against the US dollar.",
    date: "2026-06-20",
    category: "Market Update",
    readTime: "3 min read",
  },
  {
    slug: "nepal-gold-import-policy-2026",
    title: "Nepal Rastra Bank Revises Gold Import Policy to Curb Smuggling",
    summary: "Nepal Rastra Bank has updated its gold import regulations, allowing licensed banks to import up to 10 kg per transaction with stricter documentation requirements to reduce illegal cross-border gold trade.",
    date: "2026-06-18",
    category: "Policy",
    readTime: "4 min read",
  },
  {
    slug: "global-gold-rally-2026",
    title: "Global Gold Rally: XAU/USD Surpasses $3,700 Amid Fed Uncertainty",
    summary: "International gold prices crossed the $3,700/oz mark as investors seek safe-haven assets amid ongoing Federal Reserve interest rate uncertainty and geopolitical tensions in the Middle East.",
    date: "2026-06-17",
    category: "Global Markets",
    readTime: "5 min read",
  },
  {
    slug: "teej-gold-demand-nepal",
    title: "Festive Demand Boosts Gold Sales Ahead of Teej Season in Nepal",
    summary: "Jewellers across Kathmandu and Pokhara report a 35% spike in gold jewellery inquiries as the Teej festival approaches, with women traditionally receiving gold ornaments as gifts.",
    date: "2026-06-15",
    category: "Nepal Market",
    readTime: "3 min read",
  },
  {
    slug: "silver-price-nepal-analysis",
    title: "Silver Prices in Nepal: Is Now the Right Time to Buy?",
    summary: "Silver is trading at NPR 2,285 per tola in Nepal, up 12% year-to-date. Experts weigh in on the industrial demand outlook and whether silver presents value against gold at current ratios.",
    date: "2026-06-13",
    category: "Analysis",
    readTime: "6 min read",
  },
  {
    slug: "gold-investment-nepal-guide",
    title: "Gold Investment in Nepal: Physical Gold vs Gold ETF vs Digital Gold",
    summary: "A comprehensive guide for Nepali investors comparing the pros and cons of physical gold bars and coins, gold ETFs listed on NEPSE, and emerging digital gold platforms available in Nepal.",
    date: "2026-06-10",
    category: "Investment Guide",
    readTime: "8 min read",
  },
];
