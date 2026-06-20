import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy — SG Postal Code Finder",
  description: "Cookie Policy for SGPostalCode.com — how we use cookies and how you can manage them.",
  alternates: { canonical: "https://www.sgpostalcode.com/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        <span className="text-gray-800 font-medium">Cookie Policy</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: 20 June 2026</p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <div className="card">
          <p>
            This Cookie Policy explains how SGPostalCode.com (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies and
            similar tracking technologies when you visit our website. It explains what these technologies are,
            why we use them, and your rights to control our use of them.
          </p>
        </div>

        <div className="card">
          <h2 className="text-base font-bold text-gray-900 mb-3">What Are Cookies?</h2>
          <p>
            Cookies are small data files placed on your device when you visit a website. They are widely used
            by website owners to make websites work, work more efficiently, or to provide reporting information.
            Cookies set by the website owner are called &quot;first-party cookies.&quot; Cookies set by parties other
            than the website owner are called &quot;third-party cookies.&quot; Third-party cookies enable third-party
            features or functionality to be provided on or through the website.
          </p>
        </div>

        <div className="card">
          <h2 className="text-base font-bold text-gray-900 mb-3">Types of Cookies We Use</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">Cookie Type</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">Provider</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">Purpose</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">Duration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Strictly Necessary", "SGPostalCode.com", "Ensure the website functions correctly; cannot be disabled", "Session"],
                  ["Analytics", "Google Analytics", "Collect anonymised data about site usage to help us improve content and performance", "Up to 2 years"],
                  ["Advertising", "Google AdSense", "Display relevant advertisements; personalise ads based on browsing history", "Up to 2 years"],
                  ["Functional", "SGPostalCode.com", "Remember user preferences such as recent searches", "30 days"],
                  ["Map Tiles", "OpenStreetMap", "Serve map tile images; may log tile requests", "Session"],
                ].map(([type, provider, purpose, duration]) => (
                  <tr key={type} className="even:bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2 font-medium text-gray-800">{type}</td>
                    <td className="border border-gray-200 px-3 py-2">{provider}</td>
                    <td className="border border-gray-200 px-3 py-2">{purpose}</td>
                    <td className="border border-gray-200 px-3 py-2 whitespace-nowrap">{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2 className="text-base font-bold text-gray-900 mb-3">Google AdSense Cookies</h2>
          <p className="mb-3">
            We use Google AdSense to display advertisements on our website. Google AdSense uses cookies —
            including the <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">_ga</code>,{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">_gid</code>, and{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">NID</code> cookies — to serve ads
            based on your visit to our site and other sites on the Internet. These ads help us fund the free
            service we provide.
          </p>
          <p>
            You can opt out of personalised advertising by Google by visiting{" "}
            <a href="https://adssettings.google.com" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">
              Google Ad Settings
            </a>. Alternatively, visit the{" "}
            <a href="https://www.networkadvertising.org/choices/" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">
              NAI opt-out page
            </a>.
          </p>
        </div>

        <div className="card">
          <h2 className="text-base font-bold text-gray-900 mb-3">How to Control Cookies</h2>
          <p className="mb-3">You can control and manage cookies in several ways:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies. Visit your browser&apos;s help pages for instructions (Chrome, Firefox, Safari, Edge).</li>
            <li><strong>Google Analytics Opt-Out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</li>
            <li><strong>Google Ad Personalisation:</strong> Visit <a href="https://adssettings.google.com" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</li>
            <li><strong>YourOnlineChoices:</strong> Visit <a href="https://www.youronlinechoices.com" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">youronlinechoices.com</a> to opt out of targeted advertising from many providers at once.</li>
          </ul>
          <p className="mt-3 text-xs text-gray-400">
            Note: Disabling certain cookies may affect the functionality of some features of this website.
          </p>
        </div>

        <div className="card">
          <h2 className="text-base font-bold text-gray-900 mb-2">Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy periodically. Any changes will be reflected by the &quot;Last updated&quot;
            date at the top. We recommend you review this policy occasionally to stay informed about our
            use of cookies.
          </p>
        </div>

        <div className="card">
          <h2 className="text-base font-bold text-gray-900 mb-2">Contact Us</h2>
          <p>
            For questions about our use of cookies, please{" "}
            <Link href="/contact" className="text-primary-600 underline">contact us</Link> or read our{" "}
            <Link href="/privacy-policy" className="text-primary-600 underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
