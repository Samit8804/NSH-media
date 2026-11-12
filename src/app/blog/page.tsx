import type { Metadata } from "next"
import { getPosts } from "@/actions/blog"
import BlogPage from "./PageClient"
import JsonLdScript from "@/components/seo/JsonLdScript"
import { breadcrumbSchema, collectionPageSchema, webPageSchema } from "@/lib/seo"
import { pageMetadata } from "@/lib/metadata"

export const dynamic = "force-dynamic"

export const metadata: Metadata = pageMetadata({
  title: "Web Design & Development Insights",
  description:
    "Practical articles from NSH Media Services about website design, web development, e-commerce, performance, and building a useful online presence.",
  path: "/blog",
  keywords: [
    "web design insights",
    "web development articles",
    "e-commerce website tips",
  ],
})

export default async function Page() {
  const posts = await getPosts()
  const jsonPosts = (posts || []).map((p) => ({
    title: p.title,
    excerpt: p.excerpt,
    date: p.createdAt instanceof Date ? p.createdAt.toISOString() : new Date().toISOString(),
    author: p.author,
    category: p.categories?.[0] || "General",
    tags: p.tags ?? [],
    featured: p.featured,
    slug: p.slug,
  }))
  const categories = ["All", ...Array.from(new Set(jsonPosts.map((p) => p.category).filter(Boolean)))]

  const description =
    "Practical articles from NSH Media Services about website design, web development, and e-commerce."
  const structuredData = [
    webPageSchema({
      title: "Web Design & Development Insights",
      description,
      path: "/blog",
      type: "WebPage",
    }),
    collectionPageSchema({
      name: "NSH Media Services insights",
      description,
      path: "/blog",
      items: jsonPosts.map((post) => ({
        name: post.title,
        url: `/blog/${post.slug}`,
      })),
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
    ]),
  ]

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <BlogPage posts={jsonPosts} categories={categories} />
    </>
  )
}
