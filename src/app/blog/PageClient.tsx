"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, User, Tag, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
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

const categories = ["All", "Web Design", "Development", "SEO", "AI & Automation", "Branding", "Business"]

const posts = [
  { title: "The Future of Web Design: Trends Shaping 2026", excerpt: "Explore the cutting-edge design trends that are redefining user experiences and setting new standards for digital interfaces.", date: new Date("2026-05-15"), author: "Alexandra Chen", category: "Web Design", tags: ["Design Trends", "UX", "UI"], featured: true, slug: "future-of-web-design-2026" },
  { title: "How AI is Transforming Digital Marketing Strategies", excerpt: "Discover how artificial intelligence is revolutionizing campaign optimization, customer targeting, and content personalization.", date: new Date("2026-05-10"), author: "Marcus Rivera", category: "AI & Automation", tags: ["AI", "Marketing", "Automation"], featured: false, slug: "ai-transforming-digital-marketing" },
  { title: "SEO Best Practices for 2026: A Complete Guide", excerpt: "Stay ahead of the competition with the latest SEO strategies, from core web vitals to AI-powered search optimization.", date: new Date("2026-05-05"), author: "James Okafor", category: "SEO", tags: ["SEO", "Guide", "Search"], featured: false, slug: "seo-best-practices-2026" },
  { title: "Building Scalable E-Commerce Platforms with Next.js", excerpt: "Learn how modern frameworks enable fast, secure, and highly scalable online stores that convert visitors into loyal customers.", date: new Date("2026-04-28"), author: "Marcus Rivera", category: "Development", tags: ["Next.js", "E-Commerce", "Performance"], featured: false, slug: "scalable-ecommerce-nextjs" },
  { title: "The Power of Brand Storytelling in the Digital Age", excerpt: "Why authentic narratives are more important than ever for building meaningful connections with your audience.", date: new Date("2026-04-20"), author: "Sarah Thompson", category: "Branding", tags: ["Branding", "Storytelling", "Strategy"], featured: false, slug: "brand-storytelling-digital-age" },
  { title: "Measuring What Matters: Analytics for Modern Businesses", excerpt: "A data-driven approach to understanding user behavior and making informed decisions that drive growth.", date: new Date("2026-04-12"), author: "James Okafor", category: "Business", tags: ["Analytics", "Growth", "Data"], featured: false, slug: "measuring-what-matters-analytics" },
  { title: "Accessibility in Web Development: Why It Matters", excerpt: "An in-depth look at inclusive design practices and how accessibility improves experiences for everyone.", date: new Date("2026-04-05"), author: "Alexandra Chen", category: "Web Design", tags: ["Accessibility", "Inclusive Design", "Standards"], featured: false, slug: "accessibility-web-development" },
]

const ITEMS_PER_PAGE = 6

export default function BlogPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = posts.filter((post) => {
    const matchSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === "All" || post.category === activeCategory
    return matchSearch && matchCategory
  })

  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured || p !== featured)
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE)
  const paginated = rest.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-hero">
            Our{" "}<span className="text-gradient">Blog</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            Insights, strategies, and stories from our team of digital experts.
          </motion.p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <motion.div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" {...fadeInUp}>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/60" />
              <Input placeholder="Search articles..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }} className="glass pl-10 border-white/10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1) }}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/25" : "glass text-silver/70 hover:bg-white/10"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {featured && (
            <motion.div {...fadeInUp} className="glass-card group mb-12 overflow-hidden glass-hover">
              <Link href={`/blog/${featured.slug}`} className="grid md:grid-cols-2">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-[#7C3AED]/10 md:aspect-auto" />
                <div className="flex flex-col justify-center p-8">
                  <Badge className="mb-3 w-fit bg-primary/10 text-primary hover:bg-primary/20">{featured.category}</Badge>
                  <h2 className="mb-3 text-2xl font-bold leading-tight">{featured.title}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-silver">{featured.excerpt}</p>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-silver/60">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{featured.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-silver/70"><Tag className="h-3 w-3" />{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" {...stagger}>
            {paginated.map((post) => (
              <motion.div key={post.slug} {...stagger}>
                <Link href={`/blog/${post.slug}`} className="glass-card group block overflow-hidden glass-hover">
                  <div className="aspect-[16/10] bg-gradient-to-br from-primary/5 to-[#7C3AED]/5" />
                  <div className="p-6">
                    <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">{post.category}</Badge>
                    <h3 className="mb-2 text-lg font-semibold leading-snug group-hover:text-primary">{post.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-silver line-clamp-2">{post.excerpt}</p>
                    <div className="mb-3 flex items-center gap-4 text-xs text-silver/60">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-silver/70">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {totalPages > 1 && (
            <motion.div className="mt-12 flex items-center justify-center gap-2" {...fadeInUp}>
              <Button variant="outline" size="icon" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="border-white/10 text-white hover:bg-white/10">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button key={page} variant={currentPage === page ? "default" : "outline"} size="icon" onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-primary" : "border-white/10 text-white hover:bg-white/10"}>{page}</Button>
              ))}
              <Button variant="outline" size="icon" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="border-white/10 text-white hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
