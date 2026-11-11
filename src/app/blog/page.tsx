import type { Metadata } from "next"
import { getPosts } from "@/actions/blog"
import BlogPage from "./PageClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore insights, tutorials, and industry updates on web development, design, SEO, AI, and digital marketing from the NSH Media team.",
  openGraph: {
    title: "Blog | NSH Media",
    description: "Explore insights, tutorials, and industry updates on web development, design, SEO, AI, and digital marketing from the NSH Media team.",
    url: "https://nshmedia.com/blog",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | NSH Media",
    description: "Explore insights, tutorials, and industry updates on web development, design, SEO, AI, and digital marketing from the NSH Media team.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
}

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

  return <BlogPage posts={jsonPosts} categories={categories} />
}
