import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getHistoricalData, type HistoricalDataPoint } from '../lib/gold-data';

const PERIODS = ['1D', '7D', '30D', '1Y'] as const;
type Period = typeof PERIODS[number];

export default function GoldChart() {
  const [period, setPeriod] = useState<Period>('7D');
  const [data, setData] = useState<HistoricalDataPoint[]>([]);

  useEffect(() => {
    setData(getHistoricalData(period));
  }, [period]);

  const min = data.length ? Math.min(...data.map((d) => d.price)) - 2000 : 0;
  const max = data.length ? Math.max(...data.map((d) => d.price)) + 2000 : 300000;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Gold Price Chart</h2>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                period === p
                  ? 'bg-yellow-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[min, max]}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            width={45}
          />
          <Tooltip
            formatter={(value: number) => [`NPR ${value.toLocaleString('en-NP')}`, '24K / Tola']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#goldGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#f59e0b' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-400 text-center mt-2">
        24K Gold price per Tola in NPR &bull; Source: FENEGOSIDA
      </p>
    </div>
  );
}
