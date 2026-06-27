import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES_DATA } from '@/data/services'
import ServiceDetailClient from './ServiceDetailClient'

const SERVICE_IMAGES: Record<string, string> = {
  'web-design': '/images/services/web-design.jpg',
  'web-development': '/images/services/web-development.jpg',
  'ecommerce': '/images/services/ecommerce.jpg',
  'seo': '/images/services/seo.jpg',
  'branding': '/images/services/branding.jpg',
  'ai-automation': '/images/services/ai-automation.jpg',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const service = SERVICES_DATA.find((s) => s.slug === slug)
    if (!service) return {}
    const image = SERVICE_IMAGES[service.slug]
    return {
      title: service.title,
      description: service.description,
      openGraph: {
        title: service.title,
        description: service.description,
        url: `/services/${service.slug}`,
        ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
      },
      twitter: {
        card: 'summary_large_image',
        title: service.title,
        description: service.description,
        ...(image && { images: [image] }),
      },
      alternates: { canonical: `/services/${service.slug}` },
    }
  } catch {
    return {}
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES_DATA.find((s) => s.slug === slug)

  if (!service) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Organization', name: 'NSH Media' },
    url: `/services/${service.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailClient slug={slug} />
    </>
  )
}
