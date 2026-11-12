import type { Metadata } from "next"
import {
  DEFAULT_OG_ALT,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "./site"

type PageMetadataOptions = {
  /** Page title without the brand suffix (the root template adds it). */
  title: string
  description: string
  /** Root-relative path, e.g. "/services/web-design". */
  path: string
  keywords?: string[]
  /** Root-relative image URL or absolute URL. Defaults to the dynamic OG image. */
  image?: string
  imageAlt?: string
  type?: "website" | "article"
  noindex?: boolean
  /** Set for the homepage so the title is not suffixed twice. */
  absoluteTitle?: string
}

/**
 * Builds consistent, page-specific metadata: canonical, Open Graph, Twitter,
 * and robots directives.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
  type = "website",
  noindex = false,
  absoluteTitle,
}: PageMetadataOptions): Metadata {
  const ogTitle = absoluteTitle || `${title} | ${SITE_NAME}`

  return {
    ...(absoluteTitle
      ? { title: { absolute: absoluteTitle } }
      : { title }),
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: path,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  }
}

/** Root-relative OG image URL for a page, with an optional subtitle. */
export function ogImage(title: string, subtitle?: string): string {
  const params = new URLSearchParams({ title })
  if (subtitle) params.set("subtitle", subtitle)
  return `/api/og?${params.toString()}`
}

export const SITE_METADATA_BASE = new URL(SITE_URL)
