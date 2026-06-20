import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — SG Postal Code Finder",
  description: "SGPostalCode.com Privacy Policy — how we collect, use, and protect your information.",
  alternates: { canonical: "https://www.sgpostalcode.com/privacy-policy" },
};

const UPDATED = "20 June 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        <span className="text-gray-800 font-medium">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {UPDATED}</p>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <div className="card">
          <p>
            SGPostalCode.com (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit
            our website <strong>www.sgpostalcode.com</strong>. Please read this policy carefully. If you disagree
            with its terms, please discontinue use of the site.
          </p>
        </div>

        {[
          {
            title: "1. Information We Collect",
            content: (
              <div className="space-y-3">
                <p><strong>1.1 Information You Provide</strong><br />
                When you use our contact form, we collect your name, email address, and message content in order to respond to your enquiry. We do not store this information beyond what is needed to respond to your request.</p>
                <p><strong>1.2 Search Queries</strong><br />
                When you search for a postal code, building name, or road, we may log the query string (without any personally identifiable information) for the purpose of improving search performance and identifying popular content areas.</p>
                <p><strong>1.3 Automatically Collected Information</strong><br />
                When you visit SGPostalCode.com, certain information is automatically collected by our servers and third-party analytics tools, including: IP address (anonymised), browser type and version, operating system, referring URLs, pages visited, time and date of visit, and time spent on pages.</p>
              </div>
            ),
          },
          {
            title: "2. How We Use Your Information",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>To operate and maintain the website</li>
                <li>To improve site content, navigation, and search features</li>
                <li>To respond to enquiries submitted via our contact form</li>
                <li>To monitor and analyse usage patterns to improve user experience</li>
                <li>To detect and prevent fraudulent activity or abuse</li>
                <li>To comply with applicable legal obligations</li>
                <li>To display relevant advertising through Google AdSense (see Section 5)</li>
              </ul>
            ),
          },
          {
            title: "3. Cookies and Tracking Technologies",
            content: (
              <div className="space-y-3">
                <p>We use cookies and similar tracking technologies to enhance your experience on our site. Cookies are small data files stored on your browser. We use the following types of cookies:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li><strong>Strictly Necessary Cookies:</strong> Required for the site to function correctly (e.g., session management).</li>
                  <li><strong>Analytics Cookies:</strong> Used by services like Google Analytics to collect anonymised information about how visitors use the site.</li>
                  <li><strong>Advertising Cookies:</strong> Used by Google AdSense to serve personalised advertisements based on your browsing history.</li>
                </ul>
                <p>You can control cookies through your browser settings. For more information, see our <Link href="/cookie-policy" className="text-primary-600 underline">Cookie Policy</Link>.</p>
              </div>
            ),
          },
          {
            title: "4. Third-Party Services",
            content: (
              <div className="space-y-3">
                <p>We use the following third-party services that may collect data about you:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li><strong>Google Analytics:</strong> Provides website usage statistics. Data is anonymised and governed by Google&apos;s Privacy Policy.</li>
                  <li><strong>Google AdSense:</strong> Displays advertisements. Google may use cookies to personalise ads. You can opt out at <a href="https://adssettings.google.com" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</li>
                  <li><strong>OpenStreetMap / Leaflet:</strong> Powers our interactive maps. Map tile requests may be logged by OpenStreetMap servers.</li>
                  <li><strong>GitHub (data source):</strong> Our postal code data is sourced from a public GitHub repository. No personal data is shared.</li>
                </ul>
              </div>
            ),
          },
          {
            title: "5. Google AdSense and Advertising",
            content: (
              <div className="space-y-3">
                <p>
                  We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to
                  serve ads based on your prior visits to this website or other websites. Google&apos;s use of
                  advertising cookies enables it and its partners to serve ads to you based on your visit to our
                  site and/or other sites on the Internet.
                </p>
                <p>
                  You may opt out of personalised advertising by visiting{" "}
                  <a href="https://www.google.com/settings/ads" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">
                    Google Ads Settings
                  </a>
                  . Alternatively, you can opt out of third-party vendor use of cookies for personalised advertising
                  by visiting{" "}
                  <a href="https://www.aboutads.info/choices/" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">
                    aboutads.info
                  </a>
                  .
                </p>
              </div>
            ),
          },
          {
            title: "6. Data Retention",
            content: (
              <p>
                We retain anonymised analytics data for up to 26 months. Contact form submissions are retained only as long as necessary to respond to your enquiry and are then deleted. We do not retain any personally identifiable information beyond what is required for the stated purpose.
              </p>
            ),
          },
          {
            title: "7. Data Security",
            content: (
              <p>
                We implement reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse. Our website uses HTTPS (TLS encryption) for all connections. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            ),
          },
          {
            title: "8. Your Rights (GDPR / PDPA)",
            content: (
              <div className="space-y-3">
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>The right to access information we hold about you</li>
                  <li>The right to correct inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to restrict or object to processing</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p>Singapore residents are also protected under the <strong>Personal Data Protection Act (PDPA) 2012</strong>. To exercise any of these rights, please <Link href="/contact" className="text-primary-600 underline">contact us</Link>.</p>
              </div>
            ),
          },
          {
            title: "9. Children's Privacy",
            content: (
              <p>
                SGPostalCode.com is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will promptly delete it.
              </p>
            ),
          },
          {
            title: "10. Changes to This Policy",
            content: (
              <p>
                We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent update. We encourage you to review this policy periodically. Continued use of the site after changes constitutes your acceptance of the updated policy.
              </p>
            ),
          },
          {
            title: "11. Contact Us",
            content: (
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@sgpostalcode.com" className="text-primary-600 underline">
                  privacy@sgpostalcode.com
                </a>{" "}
                or via our <Link href="/contact" className="text-primary-600 underline">Contact Page</Link>.
              </p>
            ),
          },
        ].map(({ title, content }) => (
          <div key={title} className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
