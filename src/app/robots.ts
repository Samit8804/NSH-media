import { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

const PRIVATE_PATHS = [
  "/admin",
  "/admin/",
  "/client",
  "/client/",
  "/auth",
  "/auth/",
  "/thank-you",
  "/api/auth/",
  "/api/settings",
  "/api/cron/",
]

/**
 * Crawling policy
 * ---------------
 * Allowed: search engines, answer engines, and AI search/retrieval crawlers
 * (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
 * ClaudeBot, Claude-SearchBot, Applebot, Google-Extended, CCBot).
 * Blocked: private account areas, authentication callbacks, internal settings
 * APIs, and the post-enquiry thank-you page.
 *
 * CSS, JavaScript, and image assets are intentionally not blocked. The public
 * OG image route (/api/og) must stay crawlable so social and AI previews work.
 */
export default function robots(): MetadataRoute.Robots {
  const searchAndAnswerCrawlers = [
    "Googlebot",
    "Bingbot",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Applebot",
    "Google-Extended",
    "CCBot",
  ]

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      ...searchAndAnswerCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).host,
  }
}
