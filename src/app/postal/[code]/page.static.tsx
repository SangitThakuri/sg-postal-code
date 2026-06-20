"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getDistrictByPostal, classifyBuilding, getRegionByPostal } from "@/lib/data-utils";
import CopyButton from "@/components/CopyButton";
import SgPinIcon from "@/components/SgPinIcon";
import type { Building } from "@/lib/types";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

// Required for Next.js static export with dynamic routes
export function generateStaticParams() {
  return [];
}

interface PostalGroup {
  postal: string;
  buildings: Building[];
  primaryBuilding: Building;
  lat: number;
  lng: number;
}

export default function PostalCodeStaticPage() {
  const params = useParams();
  const code = (params?.code as string) ?? "";
  const [group, setGroup] = useState<PostalGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!code || !/^\d{6}$/.test(code)) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const prefix = code.substring(0, 2);
    fetch(`/data/sectors/${prefix}.json`)
      .then((r) => {
        if (!r.ok) throw new Error("sector not found");
        return r.json() as Promise<Building[]>;
      })
      .then((buildings) => {
        const filtered = buildings.filter((b) => b.POSTAL === code);
        if (!filtered.length) {
          setNotFound(true);
        } else {
          const primary = filtered.find((b) => b.BUILDING !== "NIL") ?? filtered[0];
          setGroup({
            postal: code,
            buildings: filtered,
            primaryBuilding: primary,
            lat: parseFloat(primary.LATITUDE),
            lng: parseFloat(primary.LONGITUDE),
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          <p className="text-sm text-gray-500">Loading postal code data…</p>
        </div>
      </div>
    );
  }

  if (notFound || !group) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Postal Code Not Found</h1>
        <p className="text-gray-500 mb-8">
          <strong>{code}</strong> was not found in our database.
        </p>
        <Link href="/" className="btn-primary">Go to Homepage</Link>
      </div>
    );
  }

  const { primaryBuilding: b, buildings, lat, lng } = group;
  const district = getDistrictByPostal(code);
  const region = getRegionByPostal(code);
  const buildingType = classifyBuilding(b.BUILDING, b.SEARCHVAL);
  const buildingName = b.BUILDING !== "NIL" ? b.BUILDING : b.ADDRESS;
  const sector = code.substring(0, 2);

  const uniqueBuildings = buildings.filter(
    (bld, idx, arr) =>
      bld.BUILDING !== "NIL" &&
      arr.findIndex((x) => x.BUILDING === bld.BUILDING) === idx
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary-600 transition-colors shrink-0">Home</Link>
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        <Link href="/search" className="hover:text-primary-600 transition-colors shrink-0">Postal Codes</Link>
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        <span className="text-gray-800 font-medium shrink-0">{code}</span>
      </nav>

      {/* Hero card */}
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

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-5 order-2 lg:order-1">
          {/* Address Details */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Address Details</h3>
            <dl className="space-y-3 text-sm">
              {[
                { label: "Postal Code", value: <span className="font-mono font-bold text-primary-700">{code}</span>, copyText: code },
                { label: "Full Address", value: `${b.ADDRESS}, Singapore ${code}`, copyText: `${b.ADDRESS}, Singapore ${code}` },
                { label: "Road / Street", value: b.ROAD_NAME },
                ...(b.BLK_NO && b.BLK_NO !== "NIL" ? [{ label: "Block No.", value: b.BLK_NO, copyText: undefined }] : []),
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
            <h3 className="font-semibold text-gray-900 mb-4">Location Info</h3>
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
            <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all">
              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Google Maps
            </a>
            <a href={`https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(buildingName)}&t=m`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all">
              <svg className="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple Maps
            </a>
            <a href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=17`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary-400 transition-all">
              <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
              OpenStreetMap
            </a>
          </div>

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
        </div>

        {/* Right: map + stats */}
        <div className="lg:col-span-3 space-y-5 order-1 lg:order-2">
          <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-200" style={{ height: "380px" }}>
            <MapView lat={lat} lng={lng} postal={code} buildingName={buildingName} address={b.ADDRESS} />
          </div>
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
        </div>
      </div>

      {/* Delivery info */}
      <div className="mt-6 card border-amber-200 bg-amber-50">
        <h3 className="font-semibold text-amber-900 mb-2 text-sm">SingPost Delivery</h3>
        <p className="text-xs text-amber-800 leading-relaxed">
          To send mail or parcels to this address, use: <strong>{b.ADDRESS}, Singapore {code}</strong>.
          SingPost delivers to all Singapore postal codes. Standard delivery takes 1–3 business days.
        </p>
      </div>
    </div>
  );
}
