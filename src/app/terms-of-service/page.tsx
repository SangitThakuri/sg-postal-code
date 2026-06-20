import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — SG Postal Code Finder",
  description: "Terms of Service for SGPostalCode.com — Singapore postal code directory.",
  alternates: { canonical: "https://www.sgpostalcode.com/terms-of-service" },
};

const UPDATED = "20 June 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        <span className="text-gray-800 font-medium">Terms of Service</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {UPDATED}</p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <div className="card border-amber-200 bg-amber-50">
          <p className="text-amber-800">
            <strong>Please read these Terms carefully before using SGPostalCode.com.</strong> By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.
          </p>
        </div>

        {[
          {
            title: "1. Acceptance of Terms",
            body: "By accessing or using www.sgpostalcode.com (the \"Website\"), you confirm that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. These terms apply to all visitors, users, and others who access the Website.",
          },
          {
            title: "2. Description of Service",
            body: "SGPostalCode.com provides a free online directory for searching and looking up Singapore postal codes, building names, road names, and associated address information. The service is provided for informational purposes only.",
          },
          {
            title: "3. Accuracy of Information",
            body: "While we strive to keep our postal code data accurate and up to date, we do not warrant that all information on this Website is complete, current, or error-free. Postal codes and building information may change over time. Users should verify critical address information through official sources such as SingPost (www.singpost.com) or the Singapore Land Authority (OneMap).",
          },
          {
            title: "4. Acceptable Use",
            body: "You agree to use the Website only for lawful purposes and in a manner that does not infringe the rights of others. You must not: (a) use the Website to scrape, harvest, or extract data in bulk without prior written permission; (b) attempt to interfere with or disrupt the Website's servers or network; (c) use automated bots or crawlers that impose an unreasonable load on our infrastructure; (d) reproduce or republish substantial portions of our content without attribution or prior permission; (e) use the Website for any unlawful, harmful, or fraudulent purpose.",
          },
          {
            title: "5. Intellectual Property",
            body: "The Website's design, layout, text, graphics, logos, and code are the intellectual property of SGPostalCode.com. The underlying postal code data is sourced from public Singapore government records and the GitHub repository maintained by the open-source community. You may not reproduce, republish, or commercially exploit our content without prior written consent, except for personal, non-commercial use.",
          },
          {
            title: "6. Third-Party Links and Services",
            body: "Our Website may contain links to third-party websites, including Google Maps, OpenStreetMap, and SingPost. These links are provided for convenience only. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of third-party websites. We encourage you to review the privacy policies of any third-party sites you visit.",
          },
          {
            title: "7. Disclaimer of Warranties",
            body: 'The Website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that: (a) the Website will be uninterrupted, secure, or error-free; (b) any information on the Website is accurate, complete, or current; (c) the results obtained from use of the Website will be accurate or reliable. Your use of the Website is at your own risk.',
          },
          {
            title: "8. Limitation of Liability",
            body: "To the fullest extent permitted by applicable law, SGPostalCode.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, or goodwill, arising from or related to your use of the Website, even if we have been advised of the possibility of such damages. Our total liability to you shall not exceed SGD 100.",
          },
          {
            title: "9. Indemnification",
            body: "You agree to indemnify, defend, and hold harmless SGPostalCode.com and its operators from any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from your use of the Website or violation of these Terms.",
          },
          {
            title: "10. Governing Law",
            body: "These Terms shall be governed by and construed in accordance with the laws of Singapore. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Singapore.",
          },
          {
            title: "11. Changes to Terms",
            body: "We reserve the right to modify these Terms at any time. Changes are effective when posted on this page. The \"Last Updated\" date at the top of this page reflects the most recent revision. Continued use of the Website after changes are posted constitutes your acceptance of the revised Terms.",
          },
          {
            title: "12. Contact",
            body: "",
          },
        ].map(({ title, body }) => (
          <div key={title} className="card">
            <h2 className="text-base font-bold text-gray-900 mb-2">{title}</h2>
            {title === "12. Contact" ? (
              <p>
                For questions about these Terms, please{" "}
                <Link href="/contact" className="text-primary-600 underline">contact us</Link> or email{" "}
                <a href="mailto:legal@sgpostalcode.com" className="text-primary-600 underline">
                  legal@sgpostalcode.com
                </a>.
              </p>
            ) : (
              <p>{body}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
