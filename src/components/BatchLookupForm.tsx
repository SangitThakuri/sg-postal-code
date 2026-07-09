"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BatchLookupFormProps {
  defaultValue?: string;
}

export default function BatchLookupForm({ defaultValue = "" }: BatchLookupFormProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/batch?codes=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="batch-codes" className="block text-sm font-medium text-gray-700">
        Postal codes (up to 50) — separate with commas, spaces, or new lines
      </label>
      <textarea
        id="batch-codes"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={6}
        placeholder={"018906\n238859\n049483, 348427"}
        className="w-full rounded-xl border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <button type="submit" className="btn-primary">
        Look Up All
      </button>
    </form>
  );
}
