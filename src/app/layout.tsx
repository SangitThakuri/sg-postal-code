import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GhPagesRedirect from "@/components/GhPagesRedirect";

const isGhPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

// Self-hosted via next/font instead of a CSS @import from Google's CDN —
// removes an external render-blocking round-trip and gives automatic
// font-display + preload handling. Same weights as before.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

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

// themeColor/viewport moved out of `metadata` into its own export — Next 14
// deprecated putting these in `metadata` and warns on it at build time.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-SG" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        {isGhPages && <GhPagesRedirect />}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
