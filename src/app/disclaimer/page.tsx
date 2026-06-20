import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — SG Postal Code Finder",
  description: "Disclaimer for SGPostalCode.com — Singapore postal code information is provided for informational purposes only.",
  alternates: { canonical: "https://www.sgpostalcode.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        <span className="text-gray-800 font-medium">Disclaimer</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Disclaimer</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: 20 June 2026</p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <div className="card border-red-200 bg-red-50">
          <p className="text-red-800 font-medium">
            SGPostalCode.com is an independent, non-governmental website. It is not affiliated with, endorsed by, or connected to SingPost, the Singapore Government, the Infocomm Media Development Authority (IMDA), the Singapore Land Authority (SLA), or any other government agency.
          </p>
        </div>

        {[
          {
            title: "Information Accuracy",
            body: "While we make every reasonable effort to ensure that the postal code data on this Website is accurate and up to date, we cannot guarantee the completeness, accuracy, or timeliness of all information. Singapore postal codes, building names, and addresses may change over time due to new developments, building renames, estate redevelopment, and official SingPost updates. Users should verify critical postal code information through official channels such as SingPost's official website or Singapore's OneMap service before relying on it for official correspondence, deliveries, or legal documents.",
          },
          {
            title: "Not an Official Source",
            body: "SGPostalCode.com is not an official source of Singapore postal code information. The data provided is sourced from publicly available records and is maintained on a best-effort basis. For authoritative and legally binding postal code information, please consult SingPost (www.singpost.com) or the Singapore Land Authority's OneMap (www.onemap.gov.sg).",
          },
          {
            title: "No Liability for Errors",
            body: "We shall not be held liable for any losses, damages, costs, or expenses — whether direct, indirect, incidental, or consequential — that arise from reliance on information provided on this Website. This includes, without limitation, incorrect deliveries, failed mail, financial losses, or any other harm resulting from inaccurate postal code data.",
          },
          {
            title: "Map Data",
            body: "The interactive maps on this Website are powered by OpenStreetMap and Leaflet.js, which are open-source projects. Map data accuracy is subject to the OpenStreetMap contributors' standards. We are not responsible for errors or omissions in the map data displayed.",
          },
          {
            title: "External Links",
            body: "This Website may link to external websites, including Google Maps, SingPost, and other resources. We have no control over the content or availability of these external sites and are not responsible for any information or claims made on them.",
          },
          {
            title: "Professional Advice",
            body: "Information on this Website is general in nature and is not a substitute for professional, legal, or technical advice. If you need to verify an address for legal, financial, or regulatory purposes, please consult the relevant official authorities.",
          },
          {
            title: "Intellectual Property Disclaimer",
            body: "All trademarks, service marks, and trade names referenced on this Website are the property of their respective owners. Mention of any company, product, or service does not constitute an endorsement or recommendation.",
          },
        ].map(({ title, body }) => (
          <div key={title} className="card">
            <h2 className="text-base font-bold text-gray-900 mb-2">{title}</h2>
            <p>{body}</p>
          </div>
        ))}

        <div className="card">
          <h2 className="text-base font-bold text-gray-900 mb-2">Questions?</h2>
          <p>
            If you have any questions about this disclaimer or believe there is an error in our data,
            please <Link href="/contact" className="text-primary-600 underline">contact us</Link>.
            We welcome corrections and feedback.
          </p>
        </div>
      </div>
    </div>
  );
}
