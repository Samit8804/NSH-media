import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

const NAVY = "#020617"
const NAVY_LIGHT = "#0B1224"
const BLUE = "#2563EB"
const SILVER = "#94A3B8"
const WHITE = "#F8FAFC"

function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = truncate(
    searchParams.get("title")?.trim() || "NSH Media Services",
    90,
  )
  const subtitle = truncate(
    searchParams.get("subtitle")?.trim() || "Visual Solutions",
    120,
  )
  const titleSize = title.length > 52 ? 54 : title.length > 34 ? 64 : 78

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_LIGHT} 55%, #101B36 100%)`,
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-160px",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            background: "rgba(37, 99, 235, 0.22)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-80px",
            bottom: "-220px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            background: "rgba(148, 163, 184, 0.08)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "16px",
                background: BLUE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: WHITE,
                fontSize: "34px",
                fontWeight: 800,
              }}
            >
              N
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: WHITE,
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "0.14em",
              }}
            >
              NSH
              <span style={{ color: BLUE, margin: "0 3px" }}>.</span>
              MEDIA
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: SILVER,
              fontSize: "18px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Visual Solutions
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              width: "88px",
              height: "6px",
              borderRadius: "9999px",
              background: BLUE,
              display: "flex",
            }}
          />
          <div
            style={{
              color: WHITE,
              fontSize: `${titleSize}px`,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "960px",
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: SILVER,
              fontSize: "28px",
              fontWeight: 400,
              lineHeight: 1.35,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(148, 163, 184, 0.24)",
            paddingTop: "26px",
            color: SILVER,
            fontSize: "18px",
            letterSpacing: "0.08em",
          }}
        >
          <span>nsh-media.vercel.app</span>
          <span>WEB DESIGN · WEB DEVELOPMENT · E-COMMERCE</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  )
}
