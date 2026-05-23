"use client";

import { useEffect, useRef, useState } from "react";

const W = 340;
const H = 340;
const CX = W / 2;
const CY = H / 2;
const R = 148;
const TILT = 0.22; // radians (~12.5°) — slight overhead angle

const CITIES = [
  { name: "New York",   lat: 40.7,  lon: -74.0  },
  { name: "Los Angeles",lat: 34.1,  lon: -118.2 },
  { name: "São Paulo",  lat: -23.5, lon: -46.6  },
  { name: "London",     lat: 51.5,  lon: -0.1   },
  { name: "Paris",      lat: 48.9,  lon: 2.3    },
  { name: "Lagos",      lat: 6.5,   lon: 3.4    },
  { name: "Cairo",      lat: 30.1,  lon: 31.2   },
  { name: "Dubai",      lat: 25.2,  lon: 55.3   },
  { name: "Mumbai",     lat: 19.1,  lon: 72.9   },
  { name: "Moscow",     lat: 55.8,  lon: 37.6   },
  { name: "Beijing",    lat: 39.9,  lon: 116.4  },
  { name: "Tokyo",      lat: 35.7,  lon: 139.7  },
  { name: "Singapore",  lat: 1.4,   lon: 103.8  },
  { name: "Sydney",     lat: -33.9, lon: 151.2  },
];

const LAT_LINES  = [-60, -30, 0, 30, 60];
const LON_LINES  = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

function toRad(d: number) { return (d * Math.PI) / 180; }

function project(lat: number, lon: number, rotDeg: number) {
  const phi = toRad(lat);
  const lam = toRad(lon + rotDeg);
  const x = CX + R * Math.cos(phi) * Math.sin(lam);
  // apply tilt around x-axis
  const yRaw = -Math.sin(phi);
  const zRaw =  Math.cos(phi) * Math.cos(lam);
  const y = CY + R * (yRaw * Math.cos(TILT) - zRaw * Math.sin(TILT));
  const z = yRaw * Math.sin(TILT) + zRaw * Math.cos(TILT); // >0 = front
  return { x, y, z };
}

export default function SpinningGlobe() {
  const [rot, setRot] = useState(20);
  const lastRef = useRef<number>(0);
  const rafRef  = useRef<number>(0);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const tick = (t: number) => {
      if (lastRef.current) {
        const dt = t - lastRef.current;
        setRot(r => (r + dt * 0.012) % 360);
      }
      lastRef.current = t;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Outer glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: W + 40,
          height: H + 40,
          background:
            "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
        }}
      />

      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="drop-shadow-2xl"
      >
        <defs>
          <radialGradient id="sphere-grad" cx="38%" cy="32%" r="68%">
            <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="55%"  stopColor="#0c4a6e" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#082f49" stopOpacity="1"    />
          </radialGradient>
          <radialGradient id="shine-grad" cx="30%" cy="25%" r="50%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
        </defs>

        {/* Base sphere */}
        <circle cx={CX} cy={CY} r={R} fill="url(#sphere-grad)" />

        {/* Graticule lines clipped to sphere */}
        <g clipPath="url(#globe-clip)" fill="none">
          {/* Latitude lines */}
          {LAT_LINES.map(lat => {
            const phi = toRad(lat);
            const lineRx = R * Math.cos(phi);
            const lineRy = lineRx * Math.sin(TILT);
            const lineY  = CY + R * (-Math.sin(phi) * Math.cos(TILT));
            return (
              <ellipse
                key={`lat-${lat}`}
                cx={CX} cy={lineY}
                rx={lineRx} ry={lineRy}
                stroke="#7dd3fc" strokeWidth="0.6" opacity="0.25"
              />
            );
          })}

          {/* Longitude lines */}
          {LON_LINES.map(lon => {
            const lam = toRad(lon + rot);
            const rx = Math.abs(R * Math.sin(lam));
            const front = Math.cos(lam) > 0;
            return (
              <ellipse
                key={`lon-${lon}`}
                cx={CX} cy={CY}
                rx={rx} ry={R}
                stroke="#7dd3fc" strokeWidth="0.6"
                opacity={front ? 0.3 : 0.07}
              />
            );
          })}
        </g>

        {/* Back-face city dots (dimmed, no label) */}
        {CITIES.map(c => {
          const { x, y, z } = project(c.lat, c.lon, rot);
          if (z > -0.05) return null;
          return (
            <circle key={`back-${c.name}`} cx={x} cy={y} r={2}
              fill="#fbbf24" opacity={0.12} clipPath="url(#globe-clip)" />
          );
        })}

        {/* Front-face city dots + labels */}
        {CITIES.map(c => {
          const { x, y, z } = project(c.lat, c.lon, rot);
          if (z <= -0.05) return null;
          const alpha   = Math.max(0, z);
          const isHov   = hovered === c.name;
          const showLabel = z > 0.25 || isHov;

          return (
            <g
              key={c.name}
              style={{ cursor: "default" }}
              onMouseEnter={() => setHovered(c.name)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pulse ring */}
              {z > 0.4 && (
                <circle cx={x} cy={y} r={isHov ? 9 : 6}
                  fill="none" stroke="#fbbf24"
                  strokeWidth="1"
                  opacity={alpha * (isHov ? 0.7 : 0.35)}
                  style={{ transition: "r 0.2s, opacity 0.2s" }}
                />
              )}
              {/* Dot */}
              <circle cx={x} cy={y} r={isHov ? 4 : 2.8}
                fill="#fbbf24" opacity={Math.min(1, alpha + 0.2)}
                style={{ transition: "r 0.15s" }}
              />
              {/* Label */}
              {showLabel && (
                <text
                  x={x + 6} y={y + 3.5}
                  fill="white"
                  fontSize="7.5"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                  opacity={Math.min(1, (z - 0.15) * 2.5)}
                  style={{ pointerEvents: "none" }}
                >
                  {c.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Shine overlay */}
        <circle cx={CX} cy={CY} r={R} fill="url(#shine-grad)" />

        {/* Rim */}
        <circle cx={CX} cy={CY} r={R}
          fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}
