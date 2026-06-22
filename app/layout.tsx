import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BASE_URL = "https://www.goldpricenepal.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Gold Price Nepal Today | Live Gold Rate Calculator",
    template: "%s | GoldPriceNepalal.online",
  },
  description:
    "Check today's gold price in Nepal, live gold rate, 24K and 22K gold calculator. Get gold price per tola, gram, and ounce in NPR. Updated daily by FENEGOSIDA.",
  keywords: [
    "gold price nepal",
    "gold rate today nepal",
    "suna ko bhaau",
    "24k gold price nepal",
    "gold price per tola",
    "gold calculator nepal",
    "FENEGOSIDA gold rate",
    "nepal gold market",
  ],
  authors: [{ name: "GoldPriceNepalal.online" }],
  creator: "GoldPriceNepalal.online",
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: BASE_URL,
    siteName: "GoldPriceNepalal.online",
    title: "Gold Price Nepal Today | Live Gold Rate Calculator",
    description:
      "Check today's gold price in Nepal. Live 24K, 22K, 18K gold rates per tola, gram, and ounce in NPR.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Price Nepal Today | GoldPriceNepalal.online",
    description: "Live gold price in Nepal — 24K, 22K, 18K rates in NPR per tola and gram.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NP" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GoldPriceNepalal.online",
              url: BASE_URL,
              description: "Live gold price website for Nepal",
              potentialAction: {
                "@type": "SearchAction",
                target: `${BASE_URL}/gold-calculator`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GoldPriceNepalal.online",
              url: BASE_URL,
              logo: `${BASE_URL}/logo.png`,
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
