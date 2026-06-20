import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy — GoldPriceNep.com",
  description: "Privacy policy for GoldPriceNep.com — how we collect, use, and protect your data.",
  robots: { index: false },
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We may collect the following information when you use GoldPriceNep.com:

• Usage data: pages visited, time on site, referring URLs (collected automatically via analytics)
• Device data: browser type, operating system, screen size, IP address (anonymised)
• Email address: only if you voluntarily subscribe to our price alert service
• Cookie data: session cookies and analytics cookies (see Cookie section below)

We do not collect personally identifiable financial information.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the collected data to:

• Improve website performance and user experience
• Understand which gold price features are most useful
• Send gold price alerts to subscribed users (with consent)
• Display relevant advertisements through Google AdSense
• Analyse traffic patterns to improve content`,
  },
  {
    title: "3. Cookies",
    content: `GoldPriceNep.com uses cookies to:

• Remember your calculator preferences
• Measure site traffic via Google Analytics (anonymised IP)
• Serve personalised ads via Google AdSense

You can control cookies through your browser settings. Disabling cookies may affect website functionality.`,
  },
  {
    title: "4. Google AdSense & Analytics",
    content: `This website uses Google AdSense to display advertisements. Google may use cookies to show personalised ads based on your browsing history. You can opt out of personalised advertising at Google's Ad Settings page.

We use Google Analytics to understand aggregate traffic patterns. All data is anonymised and no personal data is shared with us directly.`,
  },
  {
    title: "5. Third-Party Links",
    content: `Our website may contain links to external sites including jewellers, financial institutions, and news sources. We are not responsible for the privacy practices of those websites. We encourage you to read their privacy policies.`,
  },
  {
    title: "6. Data Retention",
    content: `Email addresses collected for price alerts are retained until you unsubscribe. Analytics data is retained for 26 months as per Google Analytics default settings. We do not sell your personal data to third parties.`,
  },
  {
    title: "7. Your Rights",
    content: `You have the right to:
• Request access to data we hold about you
• Request deletion of your personal data
• Unsubscribe from email alerts at any time
• Opt out of analytics tracking

To exercise these rights, contact us at contact@goldpricenep.com.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the website after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm">
          Effective date:{" "}
          {new Date().toLocaleDateString("en-NP", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            GoldPriceNep.com (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting
            your privacy. This policy explains what information we collect, how we use it, and the choices
            you have regarding your data when using our website at{" "}
            <strong>www.goldpricenep.com</strong>.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-5">
        {SECTIONS.map(({ title, content }) => (
          <Card key={title}>
            <CardContent className="p-6">
              <h2 className="font-bold text-gray-900 mb-3">{title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{content}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="font-bold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-sm text-gray-600">
            For privacy-related questions or requests, contact us at:{" "}
            <span className="font-medium text-gray-900">contact@goldpricenep.com</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
