import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getPostalGroup,
  getDistrictByPostal,
  searchBuildings,
  classifyBuilding,
  getRegionByPostal,
} from "@/lib/data";
import PostalCard from "@/components/PostalCard";
import CopyButton from "@/components/CopyButton";
import SgPinIcon from "@/components/SgPinIcon";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const BASE_URL = "https://www.sgpostalcode.com";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const group = await getPostalGroup(code);
  if (!group) return { title: "Postal Code Not Found" };

  const b = group.primaryBuilding;
  const building = b.BUILDING !== "NIL" ? b.BUILDING : b.ADDRESS;
  const district = getDistrictByPostal(code);
  const region = getRegionByPostal(code);

  return {
    title: `${code} Postal Code — ${building}, Singapore`,
    description: `Singapore postal code ${code}: ${building} at ${b.ADDRESS}. Located in ${district?.name ?? region}. View full address, map, coordinates, and nearby postal codes.`,
    keywords: [
      `${code} postal code`,
      `Singapore ${code}`,
      `${b.ROAD_NAME} postal code`,
      `${building} postal code`,
      "Singapore postal code",
      `postal code ${code} Singapore`,
    ],
    openGraph: {
      title: `Postal Code ${code} | SG Postal Code Finder`,
      description: `${building}, ${b.ADDRESS}`,
      url: `${BASE_URL}/postal/${code}`,
    },
    alternates: { canonical: `${BASE_URL}/postal/${code}` },
  };
}

export default async function PostalCodePage({ params }: PageProps) {
  const { code } = await params;
  if (!/^\d{6}$/.test(code)) notFound();

  const group = await getPostalGroup(code);
  if (!group) notFound();

  const { primaryBuilding: b, buildings, lat, lng } = group;
  const district = getDistrictByPostal(code);
  const region = getRegionByPostal(code);
  const buildingType = classifyBuilding(b.BUILDING, b.SEARCHVAL);
  const buildingName = b.BUILDING !== "NIL" ? b.BUILDING : b.ADDRESS;
  const sector = code.substring(0, 2);

  const nearbyResults = await searchBuildings(code.substring(0, 3), 12);
  const nearby = nearbyResults.filter((r) => r.postal !== code).slice(0, 6);

  const uniqueBuildings = buildings.filter(
    (bld, idx, arr) =>
      bld.BUILDING !== "NIL" &&
      arr.findIndex((x) => x.BUILDING === bld.BUILDING) === idx
  );

  // ── JSON-LD schemas ──────────────────────────────────────────────────────
  const faqs = [
    {
      q: `What is Singapore postal code ${code}?`,
      a: `Singapore postal code ${code} is the official 6-digit SingPost postal code assigned to ${buildingName}, located at ${b.ADDRESS}. It falls under postal sector ${sector} in the ${district?.name ?? region} area.`,
    },
    {
      q: `What building or property is located at postal code ${code}?`,
      a: `${
        uniqueBuildings.length > 1
          ? `Multiple buildings share postal code ${code}: ${uniqueBuildings.map((x) => x.BUILDING).slice(0, 5).join(", ")}${uniqueBuildings.length > 5 ? ` and ${uniqueBuildings.length - 5} more` : ""}.`
          : `The building at postal code ${code} is ${buildingName}.`
      }`,
    },
    {
      q: `What is the full address for Singapore postal code ${code}?`,
      a: `The full Singapore address for postal code ${code} is: ${b.ADDRESS}, Singapore ${code}.`,
    },
    {
      q: `Where is postal code ${code} located in Singapore?`,
      a: `Postal code ${code} is located on ${b.ROAD_NAME}, Singapore, in the ${district?.name ?? region} area. The precise GPS coordinates are ${lat.toFixed(6)}°N, ${lng.toFixed(6)}°E.`,
    },
    {
      q: `Which postal district does ${code} belong to?`,
      a: `Postal code ${code} belongs to postal sector ${sector}${district ? `, which covers the ${district.name} area of Singapore (sectors ${district.sector})` : ""}.`,
    },
    {
      q: `What road does postal code ${code} cover?`,
      a: `Postal code ${code} is associated with ${b.ROAD_NAME} in Singapore. ${
        b.BLK_NO && b.BLK_NO !== "NIL"
          ? `The block number is ${b.BLK_NO}.`
          : ""
      }`,
    },
    {
      q: `What type of building or property is at ${code}?`,
      a: `The building at postal code ${code} is classified as ${buildingType}. ${
        b.BUILDING !== "NIL"
          ? `It is known as ${b.BUILDING}.`
          : "It is a residential or mixed-use property."
      }`,
    },
    {
      q: `What are the GPS coordinates of postal code ${code}?`,
      a: `The GPS coordinates of postal code ${code} are: Latitude ${lat.toFixed(6)}, Longitude ${lng.toFixed(6)}. You can use these to navigate directly to the location.`,
    },
    {
      q: `What Singapore region is postal code ${code} in?`,
      a: `Postal code ${code} is in the ${region}. Singapore is divided into five planning regions: Central, North, North-East, East, and West.`,
    },
    {
      q: `How many buildings or units share the postal code ${code}?`,
      a: `There ${buildings.length === 1 ? "is 1 building" : `are ${buildings.length} buildings or entries`} associated with postal code ${code} in the official Singapore postal database. ${uniqueBuildings.length > 1 ? `These include ${uniqueBuildings.slice(0, 3).map((x) => x.BUILDING).join(", ")}.` : ""}`,
    },
    {
      q: `How do I send a letter or parcel to postal code ${code}?`,
      a: `To send mail to postal code ${code}, address your letter or parcel to: [Recipient Name], ${b.ADDRESS}, Singapore ${code}. SingPost delivers to all Singapore postal codes on business days. You can also use the SingPost website to calculate postage rates.`,
    },
    {
      q: `Is postal code ${code} used for residential or commercial properties?`,
      a: `Postal code ${code} is categorised as ${buildingType}. Singapore postal codes beginning with sector ${sector} generally cover the ${district?.name ?? region} area, which includes ${sector <= "23" ? "commercial, government, and mixed-use developments" : "residential estates, HDB blocks, and commercial establishments"}.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Postal Codes", item: `${BASE_URL}/search` },
      { "@type": "ListItem", position: 3, name: code, item: `${BASE_URL}/postal/${code}` },
    ],
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: buildingName,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.ADDRESS,
      postalCode: code,
      addressLocality: "Singapore",
      addressCountry: "SG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
    url: `${BASE_URL}/postal/${code}`,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary-600 transition-colors shrink-0">Home</Link>
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
          <Link href="/search" className="hover:text-primary-600 transition-colors shrink-0">Postal Codes</Link>
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
          <span className="text-gray-800 font-medium shrink-0">{code}</span>
        </nav>

        {/* Page title – mobile-first hero card */}
        <div className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 text-white p-5 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-white/15">
              <SgPinIcon className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-primary-200 text-sm font-medium uppercase tracking-wider mb-1">Singapore Postal Code</p>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-mono">{code}</h1>
                <CopyButton text={code} variant="light" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white/90 leading-snug mb-1">{buildingName}</h2>
              <div className="flex items-center gap-1.5 mb-3 text-sm text-white/70">
                <span className="leading-snug">{b.ADDRESS}, Singapore {code}</span>
                <CopyButton text={`${b.ADDRESS}, Singapore ${code}`} variant="light" />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  {buildingType}
                </span>
                {district && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                    {district.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main grid: on mobile full-width stack, lg = 2 col left detail + right map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left column – details */}
          <div className="lg:col-span-2 space-y-5 order-2 lg:order-1">

            {/* Address Details */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L12 11.168V15.25a.75.75 0 01-1.5 0v-4.082l-1.71 1.6a.75.75 0 11-1.08-1.04l3-2.8a.75.75 0 011.08 0l3 2.8a.75.75 0 01-.02 1.06z" clipRule="evenodd" /></svg>
                Address Details
              </h3>
              <dl className="space-y-3 text-sm">
                {[
                  {
                    label: "Postal Code",
                    value: <span className="font-mono font-bold text-primary-700">{code}</span>,
                    copyText: code,
                  },
                  {
                    label: "Full Address",
                    value: `${b.ADDRESS}, Singapore ${code}`,
                    copyText: `${b.ADDRESS}, Singapore ${code}`,
                  },
                  { label: "Road / Street", value: b.ROAD_NAME },
                  ...(b.BLK_NO && b.BLK_NO !== "NIL" ? [{ label: "Block No.", value: b.BLK_NO }] : []),
                  { label: "Building", value: b.BUILDING !== "NIL" ? b.BUILDING : "—" },
                  { label: "Postal Sector", value: sector },
                ].map(({ label, value, copyText }) => (
                  <div key={label} className="flex gap-3">
                    <dt className="w-28 shrink-0 font-medium text-gray-500">{label}</dt>
                    <dd className="flex-1 text-gray-800 break-words flex items-start justify-between gap-1 min-w-0">
                      <span>{value}</span>
                      {copyText && <CopyButton text={copyText} />}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Location Info */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                Location Info
              </h3>
              <dl className="space-y-3 text-sm">
                {[
                  { label: "District", value: district?.name ?? "—" },
                  { label: "Region", value: region },
                  { label: "Building Type", value: buildingType },
                  { label: "Latitude", value: <span className="font-mono">{lat.toFixed(6)}°N</span> },
                  { label: "Longitude", value: <span className="font-mono">{lng.toFixed(6)}°E</span> },
                  { label: "Country", value: "Singapore (SG)" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <dt className="w-28 shrink-0 font-medium text-gray-500">{label}</dt>
                    <dd className="text-gray-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Map links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all"
              >
                <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                Google Maps
              </a>
              <a
                href={`https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(buildingName)}&t=m`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all"
              >
                <svg className="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Apple Maps
              </a>
              <a
                href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=17`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all"
              >
                <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
                OpenStreetMap
              </a>
            </div>

            {/* Delivery info */}
            <div className="card border-amber-200 bg-amber-50">
              <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2 text-sm">
                <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor"><path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.35 41.35 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /><path d="M13.25 5a.75.75 0 01.75.75v.085a1.5 1.5 0 00.018 2.318l1.482 1.05c.516.367.75.98.75 1.547V15.5a1.5 1.5 0 01-1.5 1.5h-.086a3 3 0 00-5.828 0H9a.75.75 0 010-1.5h.586A3 3 0 0115 13.5h.5V11.75a.5.5 0 00-.25-.433l-1.484-1.051A3 3 0 0113.25 7.5V5.75a.75.75 0 01.75-.75h-.75z" /></svg>
                SingPost Delivery
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                To send mail or parcels to this address, use: <strong>{b.ADDRESS}, Singapore {code}</strong>. SingPost delivers to all Singapore postal codes. Standard delivery takes 1–3 business days.
              </p>
            </div>

            {/* Buildings at this postal code */}
            {uniqueBuildings.length > 1 && (
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                  <span>Buildings at {code}</span>
                  <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700">{uniqueBuildings.length}</span>
                </h3>
                <ul className="space-y-1.5">
                  {uniqueBuildings.map((bld, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                      <span className="text-gray-700">{bld.BUILDING}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick context card */}
            <div className="card bg-primary-50 border-primary-100">
              <p className="text-sm text-primary-700 leading-relaxed">
                Postal code <strong>{code}</strong> covers <strong>{buildingName}</strong> on <strong>{b.ROAD_NAME}</strong>,
                in the <strong>{district?.name ?? region}</strong> area.
                There {buildings.length === 1 ? "is" : "are"} <strong>{buildings.length} building{buildings.length !== 1 ? "s" : ""}</strong> at this postal code.
              </p>
            </div>
          </div>

          {/* Right column – map + nearby */}
          <div className="lg:col-span-3 space-y-5 order-1 lg:order-2">

            {/* Map */}
            <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-200" style={{ height: "380px" }}>
              <MapView lat={lat} lng={lng} postal={code} buildingName={buildingName} address={b.ADDRESS} />
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Postal Code", value: code, mono: true },
                { label: "Sector", value: sector, mono: true },
                { label: "Buildings", value: buildings.length },
                { label: "Lat / Lng", value: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, mono: true },
              ].map(({ label, value, mono }) => (
                <div key={label} className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className={`font-bold text-gray-900 text-sm truncate ${mono ? "font-mono" : ""}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Nearby postal codes */}
            {nearby.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                  Nearby Postal Codes
                  <Link href={`/search?q=${code.substring(0, 3)}`} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                    View more →
                  </Link>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {nearby.map((r) => (
                    <PostalCard key={r.postal} result={r} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQs – full width below the grid */}
        <div className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions — Postal Code {code}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Common questions about Singapore postal code {code}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-snug">
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About this postal code – SEO prose */}
        <div className="mt-8 card prose-sm max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About Singapore Postal Code {code}</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong>Postal code {code}</strong> is a 6-digit Singapore postal code assigned by SingPost to
              {" "}<strong>{buildingName}</strong>, situated at <strong>{b.ADDRESS}</strong>.
              It is located in the <strong>{region}</strong>, specifically in the{" "}
              <strong>{district?.name ?? `postal sector ${sector}`}</strong> area.
            </p>
            <p>
              The first two digits of this postal code — <strong>{sector}</strong> — identify the
              <strong> postal sector</strong>, which is a geographic zone used for sorting and delivering mail
              across Singapore. Postal sector {sector} covers the <strong>{district?.name ?? region}</strong> area.
              Within a postal sector, individual postal codes narrow down the delivery location to a specific
              building, block, or estate.
            </p>
            <p>
              The building at this address is classified as <strong>{buildingType}</strong>.
              {buildings.length > 1
                ? ` A total of ${buildings.length} building entries in the Singapore postal database share the postal code ${code}.`
                : ` This postal code is uniquely assigned to this location.`}
              {" "}The exact GPS coordinates are <strong>latitude {lat.toFixed(5)}, longitude {lng.toFixed(5)}</strong>,
              making it straightforward to navigate to this address using any mapping application.
            </p>
            <p>
              Singapore&apos;s 6-digit postal code system was introduced in 1995 and covers the entire island,
              from the Central Business District (postal sector 01–08) to the far reaches of Jurong West,
              Woodlands, Changi, and Punggol. Every address in Singapore has a unique postal code that
              enables accurate mail delivery and location identification.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
