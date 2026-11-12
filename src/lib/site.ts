/**
 * Single source of truth for public site identity.
 *
 * Only verified company information belongs here. Do not add addresses,
 * phone numbers, founding dates, awards, ratings, or social profiles unless
 * they have been confirmed by the business.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nsh-media.vercel.app"
).replace(/\/+$/, "")

export const SITE_NAME = "NSH Media Services"
export const SITE_BRAND = "NSH media"
export const SITE_TAGLINE = "Visual Solutions"

export const SITE_DESCRIPTION =
  "NSH Media Services is a digital design and development studio offering web design, web development, and e-commerce services for businesses that need a professional online presence."

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nshmediaservice@gmail.com"

/** Default social-sharing image (generated on demand by /api/og). */
export const DEFAULT_OG_IMAGE =
  "/api/og?title=NSH%20Media%20Services&subtitle=Visual%20Solutions"

export const DEFAULT_OG_ALT =
  "NSH Media Services — Visual Solutions"

/** Services verified in the site database and public navigation. */
export const VERIFIED_SERVICES = [
  {
    title: "Web Design",
    slug: "web-design",
    shortDescription:
      "User-focused website design, from wireframes and design systems to responsive, conversion-ready interfaces.",
  },
  {
    title: "Web Development",
    slug: "web-development",
    shortDescription:
      "Fast, scalable websites and web applications built with modern frameworks and clean, maintainable code.",
  },
  {
    title: "E-Commerce",
    slug: "ecommerce",
    shortDescription:
      "Online stores with clear product journeys, secure checkout, and the foundations needed to sell online.",
  },
] as const

export type VerifiedService = (typeof VERIFIED_SERVICES)[number]

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path
  if (path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function servicePath(slug: string): string {
  return `/services/${slug}`
}
