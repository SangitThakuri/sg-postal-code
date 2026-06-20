import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — SG Postal Code Finder",
  description: "Contact SGPostalCode.com for feedback, data corrections, or general inquiries about Singapore postal codes.",
  alternates: { canonical: "https://www.sgpostalcode.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        <span className="text-gray-800 font-medium">Contact</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Contact Us</h1>
      <p className="text-gray-500 mb-10">Have a question, suggestion, or data correction? We&apos;re here to help.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: "📧", title: "Email", value: "hello@sgpostalcode.com", desc: "General enquiries & feedback" },
          { icon: "🔧", title: "Data Corrections", value: "data@sgpostalcode.com", desc: "Report incorrect addresses" },
          { icon: "⏱️", title: "Response Time", value: "Within 48 hours", desc: "Business days only" },
        ].map((c) => (
          <div key={c.title} className="card text-center">
            <div className="text-3xl mb-2">{c.icon}</div>
            <p className="font-semibold text-gray-900 text-sm">{c.title}</p>
            <p className="text-primary-600 text-sm font-medium mt-1">{c.value}</p>
            <p className="text-xs text-gray-400 mt-1">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Send Us a Message</h2>
        <form className="space-y-5" action="mailto:hello@sgpostalcode.com" method="get" encType="text/plain">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="">Select a subject…</option>
              <option>General Feedback</option>
              <option>Data Correction Request</option>
              <option>Missing Postal Code</option>
              <option>Technical Issue / Bug Report</option>
              <option>Business / Partnership Enquiry</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-1.5">Relevant Postal Code (optional)</label>
            <input
              id="postal"
              name="postal"
              type="text"
              maxLength={6}
              pattern="[0-9]{6}"
              placeholder="e.g. 018906"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-500">*</span></label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Please describe your enquiry in detail…"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
          <p className="text-xs text-gray-400">
            By submitting this form you agree to our{" "}
            <Link href="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</Link>.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-primary-600 px-8 py-3 text-sm font-bold text-white hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-8 card bg-gray-50 border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-2 text-sm">Frequently Asked Contact Questions</h2>
        <div className="space-y-3">
          {[
            { q: "How do I report an incorrect postal code?", a: "Use the contact form above, select 'Data Correction Request', include the incorrect postal code, and describe what is wrong. We aim to review corrections within 5 business days." },
            { q: "Can I use your data commercially?", a: "Our data is sourced from public Singapore postal records. For commercial API or bulk data access, please email us at hello@sgpostalcode.com." },
            { q: "How do I advertise on SGPostalCode.com?", a: "For advertising inquiries, please email hello@sgpostalcode.com with 'Advertising' in the subject line." },
          ].map((faq) => (
            <div key={faq.q}>
              <p className="font-medium text-gray-800 text-sm">{faq.q}</p>
              <p className="text-sm text-gray-500 mt-0.5">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
