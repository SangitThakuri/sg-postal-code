"use client";

import { useState } from "react";

interface PostalActionsProps {
  summaryText: string;
  pageUrl: string;
}

export default function PostalActions({ summaryText, pageUrl }: PostalActionsProps) {
  const [copied, setCopied] = useState(false);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);

  async function handleCopyAll() {
    try {
      await navigator.clipboard.writeText(summaryText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = summaryText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleToggleQr() {
    if (qrOpen) {
      setQrOpen(false);
      return;
    }
    if (!qrSvg) {
      setQrLoading(true);
      // Lazy-loaded so this dependency never touches the initial page bundle.
      const qrcodeGenerator = (await import("qrcode-generator")).default;
      const qr = qrcodeGenerator(0, "M");
      qr.addData(pageUrl);
      qr.make();
      setQrSvg(qr.createSvgTag(4, 4));
      setQrLoading(false);
    }
    setQrOpen(true);
  }

  return (
    <div className="relative print:hidden">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button
        type="button"
        onClick={handleCopyAll}
        className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {copied ? (
          <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
          </svg>
        )}
        {copied ? "Copied!" : "Copy All Details"}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.752.097 1.126.153A2.212 2.212 0 0118 8.653v4.097A2.25 2.25 0 0115.75 15h-.241l.305 3.05a.5.5 0 01-.497.55H4.683a.5.5 0 01-.497-.55L4.491 15H4.25A2.25 2.25 0 012 12.75V8.653c0-1.082.775-2.01 1.874-2.198.374-.056.75-.107 1.126-.153V2.75zM6.5 6.11c1.821-.217 3.674-.327 5.549-.327.877 0 1.746.024 2.607.072a.28.28 0 00.083.001 43.687 43.687 0 00-2.5 0V2.75a.25.25 0 00-.25-.25h-6.5a.25.25 0 00-.25.25v3.36zm7 6.89H6.5v-1.63a29.596 29.596 0 017-.001V13z" clipRule="evenodd" />
        </svg>
        Print
      </button>
      <button
        type="button"
        onClick={handleToggleQr}
        aria-expanded={qrOpen}
        aria-controls="qr-code-panel"
        className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 3.5A1.5 1.5 0 014.5 2h3A1.5 1.5 0 019 3.5v3A1.5 1.5 0 017.5 8h-3A1.5 1.5 0 013 6.5v-3zm2 .5v2h2V4H5zM3 12.5A1.5 1.5 0 014.5 11h3A1.5 1.5 0 019 12.5v3A1.5 1.5 0 017.5 17h-3A1.5 1.5 0 013 15.5v-3zm2 .5v2h2v-2H5zM13.5 2A1.5 1.5 0 0012 3.5v3A1.5 1.5 0 0013.5 8h3A1.5 1.5 0 0018 6.5v-3A1.5 1.5 0 0016.5 2h-3zM14 4v2h2V4h-2zm-2 7.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H15v.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-4zm3.5 4.5v-2h-2v2h2z" />
        </svg>
        {qrLoading ? "Loading…" : "QR Code"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "All page details copied to clipboard" : ""}
      </span>
    </div>

    {qrOpen && qrSvg && (
      <div
        id="qr-code-panel"
        className="absolute z-20 mt-3 right-0 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
      >
        <div
          className="h-40 w-40 [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
        <p className="mt-2 text-center text-xs text-gray-500">Scan to open this page</p>
      </div>
    )}
    </div>
  );
}
