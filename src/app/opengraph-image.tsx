import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse cannot read CSS variables or oklch(), so brand colors are
// spelled out as hex here (they match the tokens in globals.css).
const colors = {
  background: "#080a0d",
  foreground: "#f1f4f6",
  muted: "#9fa5ac",
  border: "#282c30",
  accent: "#b2f340",
};

const bars = [
  { x: 9, y: 2, w: 6, fill: colors.accent, opacity: 1 },
  { x: 7, y: 6.5, w: 10, fill: colors.foreground, opacity: 0.85 },
  { x: 5, y: 11, w: 14, fill: colors.foreground, opacity: 0.65 },
  { x: 3, y: 15.5, w: 18, fill: colors.foreground, opacity: 0.45 },
  { x: 1, y: 20, w: 22, fill: colors.foreground, opacity: 0.28 },
];

export default async function OpengraphImage() {
  const inter = await readFile(
    path.join(
      process.cwd(),
      "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff",
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.background,
          color: colors.foreground,
          fontFamily: "Inter",
          borderTop: `8px solid ${colors.accent}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 24 24">
            {bars.map((bar) => (
              <rect
                key={bar.y}
                x={bar.x}
                y={bar.y}
                width={bar.w}
                height={2.6}
                rx={1.3}
                fill={bar.fill}
                fillOpacity={bar.opacity}
              />
            ))}
          </svg>
          <div style={{ display: "flex", fontSize: 44, letterSpacing: -1 }}>
            <span>InStack</span>
            <span style={{ color: colors.accent }}>Dev</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            lineHeight: 1.08,
            letterSpacing: -2.5,
          }}
        >
          <div style={{ display: "flex" }}>Building software, and</div>
          <div style={{ display: "flex" }}>the developers behind it</div>
          <div style={{ display: "flex", color: colors.accent }}>
            — one project at a time.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: colors.muted,
          }}
        >
          <span>github.com/{site.github.org}</span>
          <span
            style={{
              display: "flex",
              padding: "10px 22px",
              border: `2px solid ${colors.border}`,
              borderRadius: 999,
            }}
          >
            Software company + community
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: inter, weight: 600, style: "normal" }],
    },
  );
}
