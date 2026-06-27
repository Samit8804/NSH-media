import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROJECTS_DATA } from '@/data/portfolio'
import PortfolioDetailClient from './PortfolioDetailClient'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const project = PROJECTS_DATA.find((p) => p.slug === slug)
    if (!project) return {}
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        url: `/portfolio/${project.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.description,
      },
      alternates: { canonical: `/portfolio/${project.slug}` },
    }
  } catch {
    return {}
  }
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = PROJECTS_DATA.find((p) => p.slug === slug)

  if (!project) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    author: { '@type': 'Organization', name: 'NSH Media' },
    about: project.industry,
    url: `/portfolio/${project.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PortfolioDetailClient slug={slug} />
    </>
  )
}
