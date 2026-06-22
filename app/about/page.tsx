import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Zap, Globe, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "About GoldPriceNepalal.online — Nepal's Live Gold Price Website",
  description:
    "Learn about GoldPriceNepalal.online — Nepal's trusted source for live gold prices, 24K/22K/18K rates, gold calculators, and market news.",
  alternates: { canonical: "https://www.goldpricenepal.online/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About GoldPriceNepalal.online</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
          GoldPriceNepalal.online is Nepal&apos;s dedicated platform for live gold prices, historical charts,
          gold calculators, and market insights — designed specifically for Nepali consumers, investors,
          and jewellers.
        </p>
      </div>

      {/* Mission */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Gold is deeply embedded in Nepali culture — from wedding jewellery to household savings.
            Yet accessing accurate, up-to-date gold prices has historically been difficult for the
            average Nepali consumer.
          </p>
          <p className="text-gray-600 leading-relaxed">
            GoldPriceNepalal.online bridges that gap by providing transparent, timely, and accurate gold rate
            information. We pull data from FENEGOSIDA&apos;s daily announcements and international
            spot markets to give you the most reliable price information available.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-5">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { icon: Zap, title: "Live Gold Prices", desc: "Updated every 5 minutes during market hours. 24K, 22K, and 18K rates per tola, gram, and ounce in NPR." },
            { icon: BarChart3, title: "Historical Charts", desc: "Interactive price charts for 1 day, 7 days, 30 days, and 1 year to understand gold price trends." },
            { icon: Globe, title: "Gold Calculator", desc: "Calculate the exact NPR value of your gold by entering weight in grams, tola, or ounces." },
            { icon: ShieldCheck, title: "Trusted Data", desc: "Rates sourced from FENEGOSIDA (Federation of Nepal Gold and Silver Dealers Associations) and NRB exchange rates." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardContent className="p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Data sources */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Data Sources</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            {[
              { source: "FENEGOSIDA", detail: "Federation of Nepal Gold and Silver Dealers Associations — primary daily gold rate authority in Nepal." },
              { source: "Nepal Rastra Bank", detail: "Official USD/NPR exchange rates used for converting international gold prices." },
              { source: "International Spot Market", detail: "XAU/USD spot price from global commodity exchanges for real-time tracking." },
            ].map(({ source, detail }) => (
              <li key={source} className="flex gap-3">
                <span className="font-bold text-gray-900 shrink-0">{source}:</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-amber-900 mb-2">Disclaimer</h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            The prices shown on GoldPriceNepalal.online are for informational purposes only. While we
            strive for accuracy, prices may differ from those quoted by your local jeweller or bank
            due to making charges, taxes, and dealer margins. Always verify the current rate with a
            licensed gold dealer before any transaction. GoldPriceNepalal.online is not responsible for
            any financial decisions made based on the information provided on this website.
          </p>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
          <p className="text-gray-500 text-sm">
            For feedback, data corrections, advertising inquiries, or partnership opportunities,
            please reach out via our contact form or email us at{" "}
            <span className="font-medium text-gray-700">contact@goldpricenepal.online</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
