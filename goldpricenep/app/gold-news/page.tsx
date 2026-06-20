import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/AdBanner";
import { NEWS_ARTICLES } from "@/lib/gold-data";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Gold News Nepal — Latest Gold Market Updates & Analysis",
  description:
    "Stay updated with the latest gold price news in Nepal. FENEGOSIDA announcements, market analysis, Nepal gold import policy, and investment insights.",
  alternates: { canonical: "https://www.goldpricenep.com/gold-news" },
};

const CATEGORY_COLORS: Record<string, "gold" | "success" | "secondary" | "default"> = {
  "Market Update": "gold",
  "Policy": "secondary",
  "Global Markets": "default",
  "Nepal Market": "success",
  "Analysis": "secondary",
  "Investment Guide": "default",
};

export default function GoldNewsPage() {
  const [featured, ...rest] = NEWS_ARTICLES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gold News Nepal</h1>
        <p className="text-gray-500">
          Latest gold market updates, FENEGOSIDA announcements, and investment insights for Nepal.
        </p>
      </div>

      <AdBanner slot="news-top" />

      {/* Featured article */}
      <section>
        <h2 className="text-sm font-semibold text-gold-700 uppercase tracking-widest mb-4">
          Top Story
        </h2>
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gold">{featured.category}</Badge>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> {featured.readTime}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3 max-w-3xl">
              {featured.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{featured.summary}</p>
            <p className="mt-4 text-xs text-slate-500">
              {new Date(featured.date).toLocaleDateString("en-NP", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </Card>
      </section>

      {/* All articles grid */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-5">More Gold News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article) => (
            <Card key={article.slug} className="hover:shadow-md transition-shadow flex flex-col">
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={CATEGORY_COLORS[article.category] ?? "default"}>
                    {article.category}
                  </Badge>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-4 flex-1">{article.summary}</p>
                <p className="mt-4 text-xs text-gray-400">
                  {new Date(article.date).toLocaleDateString("en-NP", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter CTA (affiliate/monetisation ready) */}
      <section className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Get Daily Gold Price Alerts</h2>
        <p className="text-gold-100 text-sm mb-6">
          Be the first to know when Nepal gold price moves significantly. Free daily email updates.
        </p>
        <div className="flex items-center gap-3 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Email address"
          />
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shrink-0">
            Subscribe
          </button>
        </div>
        <p className="text-gold-200 text-xs mt-3">No spam. Unsubscribe anytime.</p>
      </section>

      <AdBanner slot="news-bottom" />
    </div>
  );
}
