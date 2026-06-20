import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, BarChart3, Bell } from "lucide-react";
import GoldPriceHero from "@/components/GoldPriceHero";
import GoldRatesTable from "@/components/GoldRatesTable";
import GoldChart from "@/components/GoldChart";
import GoldCalculator from "@/components/GoldCalculator";
import CurrencyConverter from "@/components/CurrencyConverter";
import SilverPriceCard from "@/components/SilverPriceCard";
import AdBanner from "@/components/AdBanner";
import { Card, CardContent } from "@/components/ui/card";
import { NEWS_ARTICLES } from "@/lib/gold-data";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Gold Price Nepal Today | Live Gold Rate Calculator",
  description:
    "Check today's gold price in Nepal, live gold rate, 24K and 22K gold calculator. Get gold price per tola, gram, and ounce in NPR. Updated daily by FENEGOSIDA.",
  alternates: { canonical: "https://www.goldpricenep.com" },
};

const FEATURES = [
  { icon: Zap, title: "Live Prices", desc: "Updated every 5 minutes from FENEGOSIDA" },
  { icon: BarChart3, title: "Price Charts", desc: "1D, 7D, 30D and 1Y historical data" },
  { icon: ShieldCheck, title: "Trusted Data", desc: "Cross-verified with international spot prices" },
  { icon: Bell, title: "Price Alerts", desc: "Coming soon — daily email alerts for gold rates" },
];

const FAQ = [
  { q: "What is today's gold price in Nepal?", a: `Today, 24K gold (fine gold) is priced at NPR 1,91,800 per tola in Nepal as announced by FENEGOSIDA. The price is updated every market day.` },
  { q: "How is gold price calculated in Nepal?", a: "Nepal's gold price is derived from the international spot price (XAU/USD), converted to NPR using the Nepal Rastra Bank's exchange rate, and adjusted for local taxes and import duties announced by FENEGOSIDA." },
  { q: "What is 1 Tola of gold in Nepal?", a: "One tola equals 11.6638 grams. It is the traditional unit used to measure and price gold in Nepal and India." },
  { q: "What is the difference between 24K, 22K, and 18K gold?", a: "24K is pure gold (99.9% purity). 22K is 91.6% gold (916 hallmark), used for jewellery. 18K is 75% gold (750 hallmark), commonly used in fine jewellery and rings." },
];

export default function HomePage() {
  const latestNews = NEWS_ARTICLES.slice(0, 3);

  return (
    <>
      {/* Hero section with live price */}
      <GoldPriceHero />

      {/* Top ad banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdBanner slot="homepage-top" size="leaderboard" />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Gold Rates Table */}
        <section id="rates">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Gold Rates in Nepal Today
          </h2>
          <GoldRatesTable />
        </section>

        {/* Chart */}
        <section id="chart">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Gold Price Chart (NPR per Tola)
          </h2>
          <GoldChart />
        </section>

        {/* Calculator + Converter */}
        <section id="calculator">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Gold Calculator &amp; Currency Converter
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GoldCalculator />
            </div>
            <CurrencyConverter />
          </div>
        </section>

        {/* Middle ad */}
        <AdBanner slot="homepage-mid" size="leaderboard" />

        {/* Silver prices */}
        <section id="silver">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Silver Price in Nepal Today
          </h2>
          <SilverPriceCard />
        </section>

        {/* Features */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Why Use GoldPriceNep.com?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <Card key={title}>
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-gold-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Latest news */}
        <section id="news">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Latest Gold News</h2>
            <Link
              href="/gold-news"
              className="text-sm font-medium text-gold-600 hover:text-gold-700 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestNews.map((article) => (
              <Card key={article.slug} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="gold">{article.category}</Badge>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3">{article.summary}</p>
                  <p className="mt-3 text-xs text-gray-400">
                    {new Date(article.date).toLocaleDateString("en-NP", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <Card key={q}>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQ.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              }),
            }}
          />
        </section>

        {/* Bottom ad */}
        <AdBanner slot="homepage-bottom" size="leaderboard" />
      </div>
    </>
  );
}
