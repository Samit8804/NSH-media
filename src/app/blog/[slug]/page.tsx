import { getPostBySlug, getPosts } from '@/actions/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

interface RelatedPost {
  title: string
  category: string
  date: Date | string
  slug: string
}

interface BlogPost {
  id?: string
  title: string
  excerpt: string
  date: Date | string
  author: string
  category: string
  tags: string[]
  featured: boolean
  slug: string
  content?: string
  featuredImage?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
  authorImage?: string | null
}

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

  const allPosts = await getPosts()
  const relatedPosts = ((allPosts || []) as unknown as Array<Record<string, unknown>>)
    .filter((p) => (p.categories as string[] | undefined)?.[0] === (post.categories as string[] | undefined)?.[0] && p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      title: (p.title as string) ?? "",
      category: (p.categories as string[] | undefined)?.[0] ?? "General",
      date: p.createdAt instanceof Date ? p.createdAt.toISOString() : new Date().toISOString(),
      slug: (p.slug as string) ?? "",
    }))

  const plainPost: BlogPost = {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    date: post.createdAt instanceof Date ? post.createdAt.toISOString() : new Date().toISOString(),
    author: post.author,
    category: post.categories?.[0] || "General",
    tags: post.tags ?? [],
    featured: post.featured,
    slug: post.slug,
    content: post.content,
    featuredImage: post.featuredImage,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    authorImage: post.authorImage,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostClient post={plainPost} relatedPosts={relatedPosts} />
    </>
  )
}
