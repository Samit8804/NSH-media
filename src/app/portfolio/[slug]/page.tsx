import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjects } from '@/actions/portfolio'
import PortfolioDetailClient from './PortfolioDetailClient'
import type { ProjectData } from '@/data/portfolio'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const project = await getProjectBySlug(slug)
    if (!project) return {}
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        url: `/portfolio/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.description,
      },
      alternates: { canonical: `/portfolio/${slug}` },
    }
  } catch {
    return {}
  }
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    author: { '@type': 'Organization', name: 'NSH Media' },
    about: project.industry,
    url: `/portfolio/${slug}`,
  }

  const allProjects = await getProjects()
  const relatedProjects = ((allProjects || []) as unknown as Array<Record<string, unknown>>)
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug as string,
      title: p.title as string,
      client: p.client as string,
      category: p.category as string,
      technologies: (p.technologies as string[]) ?? [],
    })) as unknown as ProjectData[]

  const plainProject = {
    slug: project.slug,
    title: project.title,
    description: project.description,
    client: project.client,
    industry: project.industry,
    overview: project.overview,
    challenge: project.challenge,
    solution: project.solution,
    technologies: (project.technologies as string[]) ?? [],
    results: (project.results as string[]) ?? [],
    testimonial: (project.testimonial ?? null) as ProjectData['testimonial'],
    category: project.category,
    liveUrl: (project.liveUrl ?? null) as ProjectData['liveUrl'],
  } as unknown as ProjectData

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PortfolioDetailClient
        slug={slug}
        project={plainProject}
        relatedProjects={relatedProjects}
      />
    </>
  )
}
