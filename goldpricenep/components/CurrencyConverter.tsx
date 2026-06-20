"use client";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_GOLD_PRICE } from "@/lib/gold-data";
import { formatNumber } from "@/lib/utils";

export default function CurrencyConverter() {
  const rate = MOCK_GOLD_PRICE.usd_npr_rate;
  const [mode, setMode] = useState<"USD_NPR" | "NPR_USD">("USD_NPR");
  const [amount, setAmount] = useState("");

  const converted = (() => {
    const n = parseFloat(amount);
    if (isNaN(n) || n <= 0) return null;
    return mode === "USD_NPR" ? n * rate : n / rate;
  })();

  const flip = () => {
    setMode((m) => (m === "USD_NPR" ? "NPR_USD" : "USD_NPR"));
    setAmount("");
  };

  const from = mode === "USD_NPR" ? "USD" : "NPR";
  const to = mode === "USD_NPR" ? "NPR" : "USD";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <p className="text-xs text-gray-500 mt-0.5">
          Rate: 1 USD = NPR {formatNumber(rate, 2)}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end gap-3 mb-5">
          <div className="flex-1">
            <Input
              id="amount"
              label={`Amount in ${from}`}
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount"
              suffix={from}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="md" onClick={flip} className="mb-0.5 shrink-0" aria-label="Flip currencies">
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
        </div>

        <div
          className={`rounded-xl px-5 py-4 transition-all ${
            converted !== null ? "bg-gold-50 border border-gold-200" : "bg-gray-50"
          }`}
        >
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Converted to {to}
          </p>
          {converted !== null ? (
            <p className="text-3xl font-black text-gold-800 tabular-nums">
              {to === "NPR" ? "₨ " : "$ "}
              {to === "NPR" ? formatNumber(converted, 0) : formatNumber(converted, 2)}
            </p>
          ) : (
            <p className="text-2xl font-bold text-gray-300">—</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-400 px-1">
          <span>Source: Nepal Rastra Bank (indicative)</span>
          <span>Updated daily</span>
        </div>
      </CardContent>
    </Card>
  );
}
