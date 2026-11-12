import {
  absoluteUrl,
  CONTACT_EMAIL,
  DEFAULT_OG_IMAGE,
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "./site"

/**
 * JSON-LD builders.
 *
 * Rules:
 * - Only verified business information is emitted.
 * - Every URL is absolute and uses the canonical site origin.
 * - No reviews, ratings, prices, addresses, or phone numbers are invented.
 */

export type JsonLd = Record<string, unknown>

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

const LOGO_URL = absoluteUrl("/icon-512.png")
const OG_IMAGE_URL = absoluteUrl(DEFAULT_OG_IMAGE)

function socialProfiles(): string[] {
  return [
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_TWITTER_URL,
    process.env.NEXT_PUBLIC_GITHUB_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
  ].filter((url): url is string => Boolean(url && url.trim()))
}

export function organizationSchema(): JsonLd {
  const sameAs = socialProfiles()

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: SITE_BRAND,
    slogan: SITE_TAGLINE,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: OG_IMAGE_URL,
    email: CONTACT_EMAIL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_EMAIL,
        availableLanguage: ["English"],
        url: absoluteUrl("/contact"),
      },
    ],
    knowsAbout: [
      "Web design",
      "Website design",
      "Web development",
      "Website development",
      "E-commerce development",
      "Online store design",
      "Responsive web design",
      "User experience design",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: SITE_BRAND,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  }
}

type WebPageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "FAQPage"
  | "ItemPage"

export function webPageSchema({
  title,
  description,
  path,
  type = "WebPage",
  dateModified,
}: {
  title: string
  description: string
  path: string
  type?: WebPageType
  dateModified?: string
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
    ...(dateModified ? { dateModified } : {}),
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}

export function serviceSchema(service: {
  title: string
  slug: string
  description: string
}): JsonLd {
  const url = absoluteUrl(`/services/${service.slug}`)

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url,
    provider: { "@id": ORGANIZATION_ID },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
    },
  }
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function blogPostingSchema(post: {
  title: string
  slug: string
  excerpt: string
  author: string
  image?: string | null
  publishedAt: Date | string
  updatedAt: Date | string
  tags?: string[]
  categories?: string[]
}): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}`)

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    image: post.image ? absoluteUrl(post.image) : OG_IMAGE_URL,
    datePublished:
      post.publishedAt instanceof Date
        ? post.publishedAt.toISOString()
        : post.publishedAt,
    dateModified:
      post.updatedAt instanceof Date
        ? post.updatedAt.toISOString()
        : post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: { "@id": ORGANIZATION_ID },
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    ...(post.categories?.length ? { articleSection: post.categories[0] } : {}),
  }
}

export function projectSchema(project: {
  title: string
  slug: string
  description: string
  client?: string
  category?: string
  technologies?: string[]
  image?: string | null
  liveUrl?: string | null
  publishedAt?: Date | string
}): JsonLd {
  const url = absoluteUrl(`/portfolio/${project.slug}`)

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url,
    mainEntityOfPage: url,
    image: project.image ? absoluteUrl(project.image) : OG_IMAGE_URL,
    creator: { "@id": ORGANIZATION_ID },
    ...(project.client ? { sponsor: { "@type": "Organization", name: project.client } } : {}),
    ...(project.category ? { genre: project.category } : {}),
    ...(project.technologies?.length
      ? { keywords: project.technologies.join(", ") }
      : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    ...(project.publishedAt
      ? {
          datePublished:
            project.publishedAt instanceof Date
              ? project.publishedAt.toISOString()
              : project.publishedAt,
        }
      : {}),
  }
}

export function collectionPageSchema({
  name,
  description,
  path,
  items,
}: {
  name: string
  description: string
  path: string
  items: { name: string; url: string }[]
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.url),
      })),
    },
  }
}

export function offerCatalogSchema(
  plans: {
    name: string
    description: string
    price: number
    slug: string
  }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${SITE_NAME} website packages`,
    url: absoluteUrl("/pricing"),
    itemListElement: plans.map((plan, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: plan.name,
      description: plan.description,
      url: absoluteUrl(`/pricing#${plan.slug}`),
      ...(plan.price > 0
        ? {
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: plan.price,
            },
          }
        : {}),
    })),
  }
}

/** Serializes JSON-LD for safe inline embedding. */
export function jsonLdString(schema: JsonLd): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c")
}
