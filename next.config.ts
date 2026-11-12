import type { NextConfig } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nsh-media.vercel.app"
const siteHost = (() => {
  try {
    return new URL(siteUrl).host
  } catch {
    return "nsh-media.vercel.app"
  }
})()

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
    ],
  },
  async redirects() {
    return [
      // Legacy service URLs that never existed as published pages.
      { source: "/services/e-commerce", destination: "/services/ecommerce", permanent: true },
      { source: "/services/seo", destination: "/services", permanent: true },
      { source: "/services/branding", destination: "/services", permanent: true },
      { source: "/services/ai-automation", destination: "/services", permanent: true },
      { source: "/services/maintenance", destination: "/services", permanent: true },
      // Thin, orphaned page with no case studies published.
      { source: "/case-studies", destination: "/portfolio", permanent: true },
      { source: "/case-studies/:path*", destination: "/portfolio", permanent: true },
      // Canonical host: redirect www to the configured primary host.
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${siteHost}` }],
        destination: `${siteUrl.replace(/\/+$/, "")}/:path*`,
        permanent: true,
      },
    ]
  },
  experimental: {
    serverActions: { bodySizeLimit: "5mb" },
  },
}

export default nextConfig
