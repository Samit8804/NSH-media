import { getPostBySlug } from '@/actions/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) return {}
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        url: `/blog/${post.slug}`,
        images: post.featuredImage ? [{ url: post.featuredImage, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        images: post.featuredImage ? [post.featuredImage] : [],
      },
      alternates: { canonical: `/blog/${post.slug}` },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post: Awaited<ReturnType<typeof getPostBySlug>> | null = null
  try {
    post = await getPostBySlug(slug)
  } catch {}

  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    ...(post.featuredImage && { image: post.featuredImage }),
    author: { '@type': 'Person', name: post.author },
    datePublished: post.createdAt instanceof Date ? post.createdAt.toISOString() : undefined,
    url: `/blog/${post.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostClient slug={slug} />
    </>
  )
}
