import { getPostBySlug, getPosts } from "@/actions/blog"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import BlogPostClient from "./BlogPostClient"
import JsonLdScript from "@/components/seo/JsonLdScript"
import { blogPostingSchema, breadcrumbSchema } from "@/lib/seo"
import { ogImage, pageMetadata } from "@/lib/metadata"

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) return {}

    const title = post.seoTitle || post.title
    return pageMetadata({
      title,
      description: post.seoDescription || post.excerpt,
      path: `/blog/${post.slug}`,
      type: "article",
      keywords: post.tags ?? [],
      image: post.featuredImage || ogImage(title, "NSH Media Services"),
      imageAlt: title,
    })
  } catch {
    return {}
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post: Awaited<ReturnType<typeof getPostBySlug>> | null = null
  try {
    post = await getPostBySlug(slug)
  } catch {}

  if (!post) notFound()

  const structuredData = [
    blogPostingSchema({
      title: post.seoTitle || post.title,
      slug: post.slug,
      excerpt: post.seoDescription || post.excerpt,
      author: post.author,
      image: post.featuredImage,
      publishedAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags ?? [],
      categories: post.categories ?? [],
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  ]

  const allPosts = await getPosts()
  const relatedPosts = ((allPosts || []) as unknown as Array<Record<string, unknown>>)
    .filter(
      (p) =>
        (p.categories as string[] | undefined)?.[0] ===
          (post.categories as string[] | undefined)?.[0] && p.slug !== slug,
    )
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
      <JsonLdScript schema={structuredData} />
      <BlogPostClient post={plainPost} relatedPosts={relatedPosts} />
    </>
  )
}
