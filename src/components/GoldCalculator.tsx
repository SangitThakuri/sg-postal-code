import { useState } from 'react';
import { GOLD_PRICE, TOLA_IN_GRAMS, TROY_OZ_IN_GRAMS } from '../lib/gold-data';

const UNITS = ['grams', 'tola', 'ounces'] as const;
type Unit = typeof UNITS[number];

export default function GoldCalculator() {
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<Unit>('grams');

  const price = GOLD_PRICE;

  function toGrams(val: number, u: Unit): number {
    if (u === 'grams') return val;
    if (u === 'tola') return val * TOLA_IN_GRAMS;
    return val * TROY_OZ_IN_GRAMS;
  }

  const grams = parseFloat(amount) > 0 ? toGrams(parseFloat(amount), unit) : 0;

  const results = [
    { label: '24K Gold', value: Math.round(grams * price.price_24k_gram), color: 'text-yellow-700' },
    { label: '22K Gold', value: Math.round(grams * price.price_22k_gram), color: 'text-yellow-600' },
    { label: '18K Gold', value: Math.round(grams * price.price_18k_gram), color: 'text-yellow-500' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Gold Price Calculator</h2>

      <div className="flex gap-3 mb-5">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter weight"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as Unit)}
          className="border border-gray-300 rounded-lg px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {UNITS.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>

      {grams > 0 && (
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.label} className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <span className="font-medium text-gray-700">{r.label}</span>
              <span className={`text-xl font-bold ${r.color}`}>
                NPR {r.value.toLocaleString('en-NP')}
              </span>
            </div>
          ))}
          <p className="text-xs text-gray-400 mt-2 text-center">
            {grams.toFixed(4)} grams &bull; {(grams / TOLA_IN_GRAMS).toFixed(4)} tola
          </p>
        </div>
      )}

      {!grams && (
        <div className="text-center py-8 text-gray-400 text-sm">
          Enter a weight above to calculate the value
        </div>
      )}
    </div>
  );
}
