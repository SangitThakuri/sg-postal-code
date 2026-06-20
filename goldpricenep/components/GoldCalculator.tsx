"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_GOLD_PRICE, TOLA_IN_GRAMS, TROY_OZ_IN_GRAMS } from "@/lib/gold-data";
import { formatNumber } from "@/lib/utils";

interface Result {
  unit: string;
  weight: number;
  k24: number;
  k22: number;
  k18: number;
}

export default function GoldCalculator() {
  const [grams, setGrams] = useState("");
  const [tola, setTola] = useState("");
  const [ounces, setOunces] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const p = MOCK_GOLD_PRICE;
  const pricePerGram24k = p.price_24k_gram;

  function calculate() {
    const res: Result[] = [];

    const g = parseFloat(grams);
    if (!isNaN(g) && g > 0) {
      res.push({
        unit: "Grams",
        weight: g,
        k24: Math.round(g * pricePerGram24k),
        k22: Math.round(g * pricePerGram24k * 22 / 24),
        k18: Math.round(g * pricePerGram24k * 18 / 24),
      });
    }

    const t = parseFloat(tola);
    if (!isNaN(t) && t > 0) {
      const weightG = t * TOLA_IN_GRAMS;
      res.push({
        unit: "Tola",
        weight: t,
        k24: Math.round(weightG * pricePerGram24k),
        k22: Math.round(weightG * pricePerGram24k * 22 / 24),
        k18: Math.round(weightG * pricePerGram24k * 18 / 24),
      });
    }

    const oz = parseFloat(ounces);
    if (!isNaN(oz) && oz > 0) {
      const weightG = oz * TROY_OZ_IN_GRAMS;
      res.push({
        unit: "Ounces",
        weight: oz,
        k24: Math.round(weightG * pricePerGram24k),
        k22: Math.round(weightG * pricePerGram24k * 22 / 24),
        k18: Math.round(weightG * pricePerGram24k * 18 / 24),
      });
    }

    setResults(res);
  }

  function reset() {
    setGrams("");
    setTola("");
    setOunces("");
    setResults([]);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-gold-700" />
          </div>
          <div>
            <CardTitle>Gold Price Calculator</CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">
              Calculate value based on weight — 24K, 22K, 18K
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <Input
            id="grams"
            label="Grams"
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 10"
            suffix="g"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
          />
          <Input
            id="tola"
            label="Tola"
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 1"
            suffix="tola"
            value={tola}
            onChange={(e) => setTola(e.target.value)}
          />
          <Input
            id="ounces"
            label="Troy Ounces"
            type="number"
            min="0"
            step="0.001"
            placeholder="e.g. 0.5"
            suffix="oz"
            value={ounces}
            onChange={(e) => setOunces(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mb-6">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button variant="outline" onClick={reset} size="md">
            Reset
          </Button>
        </div>

        {/* Base price reference */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-3 bg-gray-50 rounded-xl">
          {[
            { label: "24K / gram", value: pricePerGram24k },
            { label: "22K / gram", value: Math.round(pricePerGram24k * 22 / 24) },
            { label: "18K / gram", value: Math.round(pricePerGram24k * 18 / 24) },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-xs text-gray-500 font-medium">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 tabular-nums mt-0.5">
                ₨ {formatNumber(item.value, 0)}
              </p>
            </div>
          ))}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="border border-gold-200 rounded-xl overflow-hidden">
            <div className="bg-gold-50 px-4 py-2.5">
              <p className="text-xs font-semibold text-gold-800 uppercase tracking-wide">
                Calculated Value (NPR)
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500">Weight</th>
                  <th className="text-right py-2.5 px-4 text-xs font-semibold text-gray-500">24K</th>
                  <th className="text-right py-2.5 px-4 text-xs font-semibold text-gray-500">22K</th>
                  <th className="text-right py-2.5 px-4 text-xs font-semibold text-gray-500">18K</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {formatNumber(r.weight, r.unit === "Ounces" ? 3 : 2)} {r.unit}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900 tabular-nums">
                      {formatNumber(r.k24, 0)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-700 tabular-nums">
                      {formatNumber(r.k22, 0)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-600 tabular-nums">
                      {formatNumber(r.k18, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {results.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Calculator className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Enter weight above to calculate gold value</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
