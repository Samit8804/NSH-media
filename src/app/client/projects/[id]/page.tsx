import type { Metadata } from 'next'
import ProjectDetailClient from './ProjectDetailClient'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params
    return {
      title: `Client Project`,
      robots: { index: false, follow: false },
    }
  } catch {
    return {}
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <ProjectDetailClient id={id} />
    </>
  )
}
