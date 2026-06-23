import { useState } from 'react';
import { GOLD_PRICE } from '../lib/gold-data';

export default function CurrencyConverter() {
  const rate = GOLD_PRICE.usd_npr_rate;
  const [usd, setUsd] = useState('');
  const [npr, setNpr] = useState('');

  function handleUsd(val: string) {
    setUsd(val);
    const n = parseFloat(val);
    setNpr(isNaN(n) ? '' : (n * rate).toFixed(2));
  }

  function handleNpr(val: string) {
    setNpr(val);
    const n = parseFloat(val);
    setUsd(isNaN(n) ? '' : (n / rate).toFixed(4));
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">USD / NPR Converter</h2>
      <p className="text-sm text-gray-500 mb-5">1 USD = NPR {rate.toFixed(2)}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">US Dollar (USD)</label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400">
            <span className="px-3 py-3 bg-gray-50 text-gray-500 border-r border-gray-300 font-medium">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={usd}
              onChange={(e) => handleUsd(e.target.value)}
              className="flex-1 px-4 py-3 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-lg">⇄</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nepali Rupee (NPR)</label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400">
            <span className="px-3 py-3 bg-gray-50 text-gray-500 border-r border-gray-300 font-medium">Rs</span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={npr}
              onChange={(e) => handleNpr(e.target.value)}
              className="flex-1 px-4 py-3 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
