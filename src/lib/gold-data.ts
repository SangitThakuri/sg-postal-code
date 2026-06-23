export const TOLA_IN_GRAMS = 11.6638;
export const TROY_OZ_IN_GRAMS = 31.1035;

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

export interface HistoricalDataPoint {
  date: string;
  price: number;
}

export const GOLD_PRICE: GoldPrice = {
  price_24k_tola: 287300,
  price_22k_tola: 263358,
  price_18k_tola: 215475,
  price_24k_gram: 24634,
  price_22k_gram: 22582,
  price_18k_gram: 18476,
  price_usd_per_oz: 3350,
  usd_npr_rate: 137.50,
  change_amount: 1800,
  change_percent: 0.63,
  high_24h: 288600,
  low_24h: 285100,
  silver_per_tola: 3250,
  silver_per_gram: 279,
  silver_change_amount: 45,
  silver_change_percent: 1.40,
  last_updated: new Date().toISOString(),
};

function generateHistory(
  days: number,
  startPrice: number,
  endPrice: number,
  label: 'hour' | 'day'
): HistoricalDataPoint[] {
  const points: HistoricalDataPoint[] = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    if (label === 'hour') {
      d.setHours(d.getHours() - i);
    } else {
      d.setDate(d.getDate() - i);
    }
    const progress = (days - i) / days;
    const noise = (Math.random() - 0.5) * 2000;
    const price = Math.round(startPrice + (endPrice - startPrice) * progress + noise);
    points.push({
      date: label === 'hour'
        ? d.toLocaleTimeString('en-NP', { hour: '2-digit', minute: '2-digit' })
        : d.toLocaleDateString('en-NP', { month: 'short', day: 'numeric' }),
      price,
    });
  }
  return points;
}

export function getHistoricalData(period: '1D' | '7D' | '30D' | '1Y'): HistoricalDataPoint[] {
  const current = GOLD_PRICE.price_24k_tola;
  switch (period) {
    case '1D':  return generateHistory(24, 286000, current, 'hour');
    case '7D':  return generateHistory(7,  283500, current, 'day');
    case '30D': return generateHistory(30, 270000, current, 'day');
    case '1Y':  return generateHistory(365, 210000, current, 'day');
  }
}

export const WEEKLY_HISTORY = [
  { day: 'Mon', price_24k: 285500, price_22k: 261708, change: +200 },
  { day: 'Tue', price_24k: 285900, price_22k: 262075, change: +400 },
  { day: 'Wed', price_24k: 286200, price_22k: 262350, change: +300 },
  { day: 'Thu', price_24k: 286800, price_22k: 262900, change: +600 },
  { day: 'Fri', price_24k: 286500, price_22k: 262625, change: -300 },
  { day: 'Sat', price_24k: 287000, price_22k: 263083, change: +500 },
  { day: 'Sun', price_24k: 287300, price_22k: 263358, change: +300 },
];
