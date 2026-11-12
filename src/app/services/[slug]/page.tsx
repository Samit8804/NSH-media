import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getServiceBySlug, getServices } from "@/actions/services"
import ServiceDetailClient from "./ServiceDetailClient"
import JsonLdScript from "@/components/seo/JsonLdScript"
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo"
import { ogImage, pageMetadata } from "@/lib/metadata"
import { SITE_NAME } from "@/lib/site"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const service = await getServiceBySlug(slug)
    if (!service) return {}

    const title = service.seoTitle || `${service.title} Services`
    return pageMetadata({
      title,
      description: service.seoDescription || service.description,
      path: `/services/${service.slug}`,
      keywords: service.seoKeywords
        ? service.seoKeywords.split(",").map((keyword) => keyword.trim())
        : [
            `${service.title.toLowerCase()} services`,
            `custom ${service.title.toLowerCase()}`,
            `${service.title.toLowerCase()} for business`,
          ],
      image: ogImage(`${service.title} Services`, SITE_NAME),
    })
  } catch {
    return {}
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service || !service.published) notFound()

  const faqs = (service.faqs ?? []) as Array<{
    question: string
    answer: string
  }>

  const allServices = await getServices()
  const relatedServices = (allServices || [])
    .filter((item) => item.slug !== service.slug)
    .map((item) => ({
      title: item.title,
      slug: item.slug,
      description: item.description,
    }))

  const structuredData = [
    webPageSchema({
      title: `${service.title} Services`,
      description: service.seoDescription || service.description,
      path: `/services/${service.slug}`,
      type: "ItemPage",
    }),
    serviceSchema({
      title: service.title,
      slug: service.slug,
      description: service.description,
    }),
    ...(faqs.length ? [faqPageSchema(faqs)] : []),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.title, url: `/services/${service.slug}` },
    ]),
  ]

  const plainService = {
    id: service.id,
    title: service.title,
    slug: service.slug,
    description: service.description,
    icon: service.icon,
    benefits: (service.benefits ?? []) as string[],
    features: (service.features ?? []) as string[],
    process: (service.process ?? []) as Array<{
      title: string
      description: string
    }>,
    faqs,
  }

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <ServiceDetailClient
        service={plainService}
        relatedServices={relatedServices}
      />
    </>
  )
}
