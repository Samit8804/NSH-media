import { MetadataRoute } from "next"

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nshmedia.com").replace(/\/+$/, "")

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/client/", "/api/auth/", "/api/cron/"] },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
