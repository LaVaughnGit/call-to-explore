"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useMapContext,
} from "react-simple-maps";

// ─── Ship icon (pointing right, rotate="auto" steers it) ─────────────────────
function ShipIcon({ color }: { color: string }) {
  return (
    <g>
      {/* hull */}
      <path d="M 7,1.5 Q 0,3.5 -7,1.5 L -6,-0.5 L 6,-0.5 Z" fill={color} />
      {/* superstructure */}
      <rect x="-3" y="-3.5" width="6" height="3" rx="0.5" fill={color} />
      {/* smokestack */}
      <rect x="0.5" y="-6" width="1.8" height="2.5" rx="0.3" fill={color} />
    </g>
  );
}

// ─── Plane icon (pointing right) ─────────────────────────────────────────────
function PlaneIcon({ color }: { color: string }) {
  return (
    <g>
      {/* fuselage */}
      <ellipse cx="0" cy="0" rx="5.5" ry="1.2" fill={color} />
      {/* nose cone */}
      <path d="M 5.5,0 L 8,0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* main wings */}
      <path d="M -1,-1 L 2,0 L -1,1 L -4,-4 Z" fill={color} />
      <path d="M -1,-1 L 2,0 L -1,1 L -4,4 Z" fill={color} />
      {/* tail fin */}
      <path d="M -4,-1 L -4,0 L -6,-3 Z" fill={color} />
    </g>
  );
}

// ─── Ship + plane routes ──────────────────────────────────────────────────────
// Each route: from [lon,lat], via [lon,lat] control point, to [lon,lat]
const SHIP_ROUTES: {
  from: [number, number];
  via: [number, number];
  to: [number, number];
  dur: number;
  begin: number;
}[] = [
  // NY → Bermuda (North Atlantic)
  { from: [-74, 40.7], via: [-70, 36], to: [-64.8, 32.3], dur: 28, begin: 0 },
  // Bahamas → St. Lucia (Caribbean chain)
  { from: [-77, 25], via: [-68, 20], to: [-61, 13.9], dur: 32, begin: 8 },
  // New York → Southampton (North Atlantic crossing, eastward)
  { from: [-74, 40.7], via: [-38, 48], to: [-1.4, 50.9], dur: 38, begin: 5 },
  // Barcelona → Athens (Mediterranean, open sea)
  { from: [2.2, 41.4], via: [13, 35], to: [23.7, 37.9], dur: 26, begin: 12 },
  // Cape Town → Mauritius (Indian Ocean, open water)
  { from: [18.4, -33.9], via: [40, -28], to: [57.5, -20.2], dur: 34, begin: 4 },
  // Singapore → New Zealand (via open Pacific, east of Australia)
  { from: [103.8, 1.4], via: [165, -22], to: [172.6, -43.5], dur: 44, begin: 16 },
];

const FLIGHT_ROUTES: {
  from: [number, number];
  via: [number, number];
  to: [number, number];
  dur: number;
  begin: number;
}[] = [
  // New York → London
  { from: [-74, 40.7], via: [-38, 55], to: [-0.1, 51.5], dur: 16, begin: 0 },
  // London → Dubai
  { from: [-0.1, 51.5], via: [27, 50], to: [55.3, 25.2], dur: 14, begin: 3 },
  // Dubai → Tokyo
  { from: [55.3, 25.2], via: [100, 42], to: [139.7, 35.7], dur: 18, begin: 7 },
  // New York → Caribbean
  { from: [-74, 40.7], via: [-70, 28], to: [-66.5, 18.2], dur: 12, begin: 2 },
  // London → Singapore
  { from: [-0.1, 51.5], via: [55, 42], to: [103.8, 1.4], dur: 20, begin: 9 },
  // LA → Tokyo (great circle over North Pacific)
  { from: [-118.2, 34.1], via: [-175, 52], to: [139.7, 35.7], dur: 22, begin: 6 },
  // Paris → Bora Bora
  { from: [2.3, 48.9], via: [-60, 20], to: [-151.7, -16.5], dur: 24, begin: 11 },
];

// ─── Inner component — uses useMap() to get the live projection ───────────────
function AnimatedVehicles() {
  const { projection } = useMapContext();

  function pt(lonLat: [number, number]): [number, number] {
    const r = projection(lonLat);
    return r ? [r[0], r[1]] : [0, 0];
  }

  function quadPath(
    from: [number, number],
    via: [number, number],
    to: [number, number]
  ) {
    const [x1, y1] = pt(from);
    const [cx, cy] = pt(via);
    const [x2, y2] = pt(to);
    return `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`;
  }

  return (
    <g>
      {/* ── Ships ── */}
      {SHIP_ROUTES.map((r, i) => {
        const id = `ship-path-${i}`;
        const d = quadPath(r.from, r.via, r.to);
        return (
          <g key={id}>
            <path
              id={id} d={d}
              fill="none"
              stroke="rgba(251,191,36,0.22)"
              strokeWidth={0.7}
              strokeDasharray="4,5"
            />
            <g opacity={0.85}>
              <animateMotion
                dur={`${r.dur}s`}
                repeatCount="indefinite"
                begin={`${r.begin}s`}
                rotate="auto"
              >
                <mpath href={`#${id}`} />
              </animateMotion>
              <ShipIcon color="#fbbf24" />
            </g>
          </g>
        );
      })}

      {/* ── Planes ── */}
      {FLIGHT_ROUTES.map((r, i) => {
        const id = `plane-path-${i}`;
        // Arc planes higher by lifting the control point
        const [cx, cy] = pt(r.via);
        const [x1, y1] = pt(r.from);
        const [x2, y2] = pt(r.to);
        const arcD = `M ${x1},${y1} Q ${cx},${cy - 30} ${x2},${y2}`;
        return (
          <g key={id}>
            <path
              id={id} d={arcD}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={0.6}
              strokeDasharray="5,7"
            />
            <g opacity={0.75}>
              <animateMotion
                dur={`${r.dur}s`}
                repeatCount="indefinite"
                begin={`${r.begin}s`}
                rotate="auto"
              >
                <mpath href={`#${id}`} />
              </animateMotion>
              <PlaneIcon color="white" />
            </g>
          </g>
        );
      })}
    </g>
  );
}

const GEO_URL = "/world-110m.json";

// [longitude, latitude]
const DESTINATIONS: { name: string; coordinates: [number, number] }[] = [
  // North America
  { name: "Alaska",              coordinates: [-153.0,  64.2] },
  { name: "Canada",              coordinates: [ -96.0,  56.0] },
  { name: "Chicago",             coordinates: [ -87.6,  41.9] },
  { name: "New York",            coordinates: [ -74.0,  40.7] },
  { name: "Mexico City",         coordinates: [ -99.1,  19.4] },
  { name: "Cozumel",             coordinates: [ -86.9,  20.5] },
  { name: "Cayman Islands",      coordinates: [ -81.4,  19.3] },
  // Caribbean
  { name: "The Bahamas",         coordinates: [ -77.4,  25.1] },
  { name: "Bermuda",             coordinates: [ -64.8,  32.3] },
  { name: "Puerto Rico",         coordinates: [ -66.5,  18.2] },
  { name: "Dominican Republic",  coordinates: [ -69.9,  18.5] },
  { name: "St. Lucia",           coordinates: [ -61.0,  13.9] },
  { name: "Barbados",            coordinates: [ -59.6,  13.2] },
  { name: "Aruba",               coordinates: [ -69.9,  12.5] },
  // Central & South America
  { name: "Belize",              coordinates: [ -88.2,  17.3] },
  { name: "Guatemala",           coordinates: [ -90.5,  14.6] },
  { name: "Costa Rica",          coordinates: [ -84.1,   9.9] },
  { name: "Nicaragua",           coordinates: [ -85.3,  12.1] },
  { name: "Panama",              coordinates: [ -79.5,   9.0] },
  { name: "Colombia",            coordinates: [ -75.5,  10.4] },
  { name: "Brazil",              coordinates: [ -47.9, -15.8] },
  { name: "Buenos Aires",        coordinates: [ -58.4, -34.6] },
  // Pacific
  { name: "Tahiti",              coordinates: [-149.4, -17.5] },
  { name: "Bora Bora",           coordinates: [-151.7, -16.5] },
  { name: "Moorea",              coordinates: [-149.8, -17.5] },
  // Europe
  { name: "England",             coordinates: [  -0.1,  51.5] },
  { name: "Netherlands",         coordinates: [   4.9,  52.4] },
  { name: "Belgium",             coordinates: [   4.4,  50.9] },
  { name: "France",              coordinates: [   2.3,  48.9] },
  { name: "Portugal",            coordinates: [  -9.1,  38.7] },
  { name: "Italy",               coordinates: [  12.5,  41.9] },
  { name: "Croatia",             coordinates: [  16.4,  43.5] },
  { name: "Romania",             coordinates: [  26.1,  44.4] },
  { name: "Austria",             coordinates: [  16.4,  48.2] },
  { name: "Turkey",              coordinates: [  29.0,  41.0] },
  { name: "Israel",              coordinates: [  34.8,  32.1] },
  { name: "Greece",              coordinates: [  23.7,  37.9] },
  // Africa & Middle East
  { name: "Egypt",               coordinates: [  31.2,  30.1] },
  { name: "Dubai",               coordinates: [  55.3,  25.2] },
  { name: "Kenya",               coordinates: [  36.8,  -1.3] },
  // Asia
  { name: "Russia",              coordinates: [  37.6,  55.8] },
  { name: "China",               coordinates: [ 116.4,  39.9] },
  { name: "Hong Kong",           coordinates: [ 114.2,  22.3] },
  { name: "Macao",               coordinates: [ 113.5,  22.2] },
  { name: "Japan",               coordinates: [ 139.7,  35.7] },
  { name: "Thailand",            coordinates: [ 100.5,  13.8] },
  { name: "Singapore",           coordinates: [ 103.8,   1.4] },
  { name: "India",               coordinates: [  77.2,  28.6] },
  // Oceania
  { name: "Australia",           coordinates: [ 133.8, -25.3] },
  { name: "New Zealand",         coordinates: [ 172.6, -43.5] },
];

export default function WorldMapHero() {
  const [hovered, setHovered] = useState<string | null>(null);

  // spread preserveAspectRatio onto the underlying <svg> via react-simple-maps' restProps
  const sliceProps = { preserveAspectRatio: "xMidYMid slice" } as Record<string, unknown>;

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <ComposableMap
        width={1000}
        height={500}
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 162, center: [0, 12] }}
        style={{ width: "100%", height: "100%", display: "block" }}
        {...sliceProps}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="rgba(56,189,248,0.18)"
                stroke="rgba(125,211,252,0.5)"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover:   { outline: "none", fill: "rgba(56,189,248,0.25)" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {DESTINATIONS.map(({ name, coordinates }) => {
          const isHov = hovered === name;
          return (
            <Marker
              key={name}
              coordinates={coordinates}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Outer ring */}
              <circle
                r={isHov ? 7 : 4}
                fill="none"
                stroke="#fbbf24"
                strokeWidth={isHov ? 1.2 : 0.8}
                strokeOpacity={isHov ? 0.8 : 0.4}
                style={{ transition: "r 0.15s" }}
              />
              {/* Pin dot */}
              <circle
                r={isHov ? 3 : 2}
                fill="#fbbf24"
                fillOpacity={isHov ? 1 : 0.7}
                style={{ transition: "r 0.15s", cursor: "default" }}
              />
              {/* Hover label */}
              {isHov && (
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 9,
                    fontWeight: 600,
                    fill: "white",
                    pointerEvents: "none",
                    userSelect: "none",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                  }}
                >
                  {name}
                </text>
              )}
            </Marker>
          );
        })}

        <AnimatedVehicles />
      </ComposableMap>
    </div>
  );
}
