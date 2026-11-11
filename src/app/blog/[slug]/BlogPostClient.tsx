"use client"

import { motion } from "framer-motion"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, staggerChildren: 0.08 },
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

interface RelatedPost {
  title: string
  category: string
  date: Date | string
  slug: string
}

interface BlogPostClientProps {
  post?: BlogPost | null
  relatedPosts?: RelatedPost[]
}

export default function BlogPostClient({ post, relatedPosts = [] }: BlogPostClientProps) {
  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-bg px-6">
        <h1 className="text-4xl font-bold text-white">Post not found</h1>
        <p className="mt-4 text-silver">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/blog">
          <Button className="mt-8 gap-2 bg-primary text-white hover:bg-primary-hover">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden bg-mesh text-white">
        <div className="aspect-[2/1] max-h-[500px] w-full bg-gradient-to-br from-primary/20 via-[#7C3AED]/10 to-transparent md:aspect-[3/1]" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent px-6 pb-16 pt-32">
          <motion.div className="mx-auto w-full max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-primary/20 text-primary-hover">{post.category}</Badge>
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} className="bg-white/10 text-silver/70">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-silver/60">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.date)}</span>
              {post.content && <span className="flex items-center gap-1.5"><Tag className="h-4 w-4" />{Math.max(1, Math.floor(post.content.split(/\s+/).length / 200))} min read</span>}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <motion.div className="mb-12 flex items-center gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-[#7C3AED]/20 text-lg font-bold text-primary">
              {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-silver">Author</p>
            </div>
          </motion.div>

          <motion.div className="max-w-none" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="lead text-lg text-silver mb-8">{post.excerpt}</p>

            <div className="glass-card p-8 mb-10">
              <p className="text-lg italic text-silver leading-relaxed">&ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;</p>
              <p className="mt-3 text-sm font-medium text-primary">&mdash; Steve Jobs</p>
            </div>

            {post.content && (
              <>
                <h2 className="text-subsection mt-10 mb-4">Introduction</h2>
                <p className="text-silver mb-4">{post.content}</p>
              </>
            )}

            <div className="glass-card p-6 mb-10">
              <p className="mb-4 text-sm font-medium">Share this article</p>
              <div className="flex gap-3">
                {[
                  { path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", label: "Twitter" },
                  { path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", label: "LinkedIn" },
                  { path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", label: "Facebook" },
                ].map((s, i) => (
                  <Button key={i} variant="outline" size="sm" className="gap-2 rounded-full border-white/10 text-white hover:bg-white/10">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                    {s.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-white/10 px-6 py-20">
          <div className="container-site">
            <motion.div {...fadeInUp}>
              <h2 className="text-section">Related Posts</h2>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {relatedPosts.map((related, i) => (
                  <motion.div key={related.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                    <Link href={`/blog/${related.slug}`} className="glass-card group block overflow-hidden glass-hover">
                      <div className="aspect-[16/10] bg-gradient-to-br from-primary/5 to-[#7C3AED]/5" />
                      <div className="p-5">
                        <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">{related.category}</Badge>
                        <h3 className="mb-2 font-semibold leading-snug group-hover:text-primary">{related.title}</h3>
                        <span className="text-xs text-silver/60">{formatDate(related.date)}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="border-t border-white/10 px-6 py-12">
        <div className="container-site text-center">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary-hover">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-12">
        <div className="container-site text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-subsection">More Articles</h2>
            <p className="mt-3 text-silver">Browse all articles by category</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/blog?tag=Web%20Design">
                <Button variant="outline" size="sm" className="border-white/10 text-silver hover:bg-white/10">Web Design</Button>
              </Link>
              <Link href="/blog?tag=Development">
                <Button variant="outline" size="sm" className="border-white/10 text-silver hover:bg-white/10">Development</Button>
              </Link>
              <Link href="/blog?tag=SEO">
                <Button variant="outline" size="sm" className="border-white/10 text-silver hover:bg-white/10">SEO</Button>
              </Link>
              <Link href="/blog?tag=AI%20%26%20Automation">
                <Button variant="outline" size="sm" className="border-white/10 text-silver hover:bg-white/10">AI & Automation</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
