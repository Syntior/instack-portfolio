import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { logoFacets } from "@/components/brand/logo";
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
  accent: "#63b9fe",
};

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
            {logoFacets.map((facet) => (
              <polygon key={facet.points} {...facet} />
            ))}
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 48,
              letterSpacing: -1,
              color: colors.accent,
            }}
          >
            Syntior
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
          <span>Software company · Developer community</span>
          <span
            style={{
              display: "flex",
              padding: "10px 22px",
              border: `2px solid ${colors.border}`,
              borderRadius: 999,
            }}
          >
            Software company
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
