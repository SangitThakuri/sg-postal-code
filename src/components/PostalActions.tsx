"use client";

import { useState } from "react";

interface PostalActionsProps {
  summaryText: string;
  pageUrl: string;
  shareTitle: string;
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // navigator.clipboard requires a secure context and isn't available in
    // every browser/embedded-webview combination. execCommand is deprecated
    // but still works everywhere as a last-resort fallback — intentionally
    // kept for that reason, not an oversight (same pattern as CopyButton).
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

export default function PostalActions({ summaryText, pageUrl, shareTitle }: PostalActionsProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  async function handleCopyAll() {
    await copyToClipboard(summaryText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }

  async function handleCopyUrl() {
    await copyToClipboard(pageUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  }

  async function handleShare() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: shareTitle, url: pageUrl });
      } catch {
        // User cancelled the share sheet, or it failed silently — nothing to do.
      }
      return;
    }
    // No Web Share API (most desktop browsers) — fall back to copying the URL.
    await handleCopyUrl();
  }

  return (
    <div className="print:hidden">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={handleCopyAll}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {copiedAll ? (
            <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
              <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
            </svg>
          )}
          {copiedAll ? "Copied!" : "Copy All Details"}
        </button>
        <button
          type="button"
          onClick={handleCopyUrl}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {copiedUrl ? (
            <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
          )}
          {copiedUrl ? "Copied!" : "Copy URL"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
          </svg>
          Share
        </button>
        <span role="status" aria-live="polite" className="sr-only">
          {copiedAll ? "All page details copied to clipboard" : copiedUrl ? "URL copied to clipboard" : ""}
        </span>
      </div>
    </div>
  );
}
