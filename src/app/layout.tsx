import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SG Postal Code Finder - Singapore Postal Code Search",
    template: "%s | SG Postal Code Finder",
  },
  description:
    "Find Singapore postal codes, building names, addresses and locations. Search by postal code, building name, or road name.",
  keywords: [
    "Singapore postal code",
    "Singapore postcode",
    "postal code finder",
    "Singapore address",
    "building search Singapore",
    "SG postal",
  ],
  metadataBase: new URL("https://www.sgpostalcode.com"),
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://www.sgpostalcode.com",
    siteName: "SG Postal Code Finder",
    title: "SG Postal Code Finder - Singapore Postal Code Search",
    description:
      "Find Singapore postal codes, building names, addresses and locations.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SG Postal Code Finder",
    description: "Find Singapore postal codes instantly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-SG">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
