"use client";

import { useEffect, useRef } from "react";

interface MapViewProps {
  lat: number;
  lng: number;
  postal: string;
  buildingName?: string;
  address?: string;
  zoom?: number;
}

export default function MapView({
  lat,
  lng,
  postal,
  buildingName,
  address,
  zoom = 17,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!isMounted || !mapRef.current) return;

      // Fix default marker icons
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current).setView([lat, lng], zoom);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const customIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            background-color: #2563eb;
            color: white;
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 700;
            font-family: sans-serif;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transform: rotate(-45deg);
            cursor: pointer;
          ">
            <span style="transform: rotate(45deg); line-height: 1;">${postal}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      const popupContent = `
        <div style="font-family: sans-serif; min-width: 200px;">
          <div style="font-weight: 700; font-size: 14px; color: #1e40af; margin-bottom: 4px;">
            Postal Code: ${postal}
          </div>
          ${buildingName && buildingName !== "NIL" ? `<div style="font-weight: 600; font-size: 13px; color: #111827; margin-bottom: 2px;">${buildingName}</div>` : ""}
          ${address ? `<div style="font-size: 12px; color: #6b7280;">${address}</div>` : ""}
        </div>
      `;

      L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent, { maxWidth: 280 })
        .openPopup();
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, postal, buildingName, address, zoom]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-xl" style={{ minHeight: "400px" }} />
  );
}
