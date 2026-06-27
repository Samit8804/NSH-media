"use client"

import { motion } from "framer-motion"
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
}

const relatedPosts = [
  { title: "The Future of Web Design: Trends Shaping 2026", category: "Web Design", date: new Date("2026-05-15"), slug: "future-of-web-design-2026" },
  { title: "How AI is Transforming Digital Marketing Strategies", category: "AI & Automation", date: new Date("2026-05-10"), slug: "ai-transforming-digital-marketing" },
  { title: "SEO Best Practices for 2026: A Complete Guide", category: "SEO", date: new Date("2026-05-05"), slug: "seo-best-practices-2026" },
]

export default function BlogPostClient({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden bg-mesh text-white">
        <div className="aspect-[2/1] max-h-[500px] w-full bg-gradient-to-br from-primary/20 via-[#7C3AED]/10 to-transparent md:aspect-[3/1]" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent px-6 pb-16 pt-32">
          <motion.div className="mx-auto w-full max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-primary/20 text-primary-hover">Web Design</Badge>
              <Badge className="bg-white/10 text-silver/70">Development</Badge>
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">The Future of Web Design: Trends Shaping 2026</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-silver/60">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />Alexandra Chen</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(new Date("2026-05-15"))}</span>
              <span className="flex items-center gap-1.5"><Tag className="h-4 w-4" />5 min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <motion.div className="mb-12 flex items-center gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-[#7C3AED]/20 text-lg font-bold text-primary">AC</div>
            <div>
              <p className="font-semibold">Alexandra Chen</p>
              <p className="text-sm text-silver">CEO & Founder</p>
            </div>
          </motion.div>

          <motion.div className="max-w-none" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="lead text-lg text-silver mb-8">
              The digital landscape is evolving at an unprecedented pace. As we move deeper into 2026, web design trends are being shaped by technological advancements, changing user behaviors, and a renewed focus on accessibility and performance.
            </p>

            <div className="glass-card p-8 mb-10">
              <p className="text-lg italic text-silver leading-relaxed">&ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;</p>
              <p className="mt-3 text-sm font-medium text-primary">— Steve Jobs</p>
            </div>

            <h2 className="text-subsection mt-10 mb-4">The Rise of AI-Driven Design</h2>
            <p className="text-silver mb-4">Artificial intelligence is no longer a futuristic concept — it is actively reshaping how designers approach their craft. From generative design tools that produce multiple layout variations in seconds to AI-powered personalization engines that tailor experiences to individual users, the possibilities are expanding rapidly.</p>
            <p className="text-silver mb-4">Designers who embrace AI as a collaborative partner rather than a replacement will find themselves creating more impactful, data-informed experiences. The key is understanding where human creativity remains irreplaceable: in strategy, storytelling, and emotional connection.</p>

            <div className="glass-card p-6 mb-10 overflow-x-auto">
              <pre className="text-sm text-silver"><code>{`// AI-powered personalization example
const userPreferences = await analyzeUserBehavior(userId)
const personalizedLayout = generateLayout(userPreferences)

return <PersonalizedExperience layout={personalizedLayout} />`}</code></pre>
            </div>

            <h2 className="text-subsection mt-10 mb-4">Performance as a Design Principle</h2>
            <p className="text-silver mb-4">Core Web Vitals have cemented performance as a critical design consideration. In 2026, users expect near-instant load times, and search engines reward sites that deliver. This has led to a resurgence of minimalist design — not as an aesthetic choice, but as a performance strategy.</p>
            <p className="text-silver mb-4">Techniques such as lazy loading, optimized image formats like WebP and AVIF, and server-side rendering frameworks are becoming standard practice. The best designs are those that feel rich and engaging while remaining technically lightweight.</p>

            <h2 className="text-subsection mt-10 mb-4">Immersive and Interactive Experiences</h2>
            <p className="text-silver mb-4">Advances in browser capabilities are enabling richer, more immersive web experiences without the need for plugins. Scroll-triggered animations, 3D elements powered by WebGL, and micro-interactions that provide instant feedback are elevating user engagement.</p>
            <p className="text-silver mb-4">However, restraint remains vital. The most effective immersive experiences are purposeful — each animation should serve a functional or narrative goal rather than existing purely for visual flair.</p>

            <h2 className="text-subsection mt-10 mb-4">Accessibility First</h2>
            <p className="text-silver mb-4">Inclusive design is no longer optional. Regulations and user expectations are driving a fundamental shift toward accessibility-first workflows. This means designing for screen readers, ensuring sufficient color contrast, supporting keyboard navigation, and providing clear focus indicators from the outset.</p>
            <p className="text-silver mb-4">Embracing accessibility leads to better experiences for everyone. Many accessibility improvements — such as clear typography and logical content structure — benefit all users, regardless of ability.</p>

            <h2 className="text-subsection mt-10 mb-4">Looking Ahead</h2>
            <p className="text-silver mb-4">The web design trends of 2026 reflect a maturing industry that values substance over spectacle. The agencies and designers who will thrive are those who balance technical excellence with human-centered design, who leverage AI without losing the human touch, and who prioritize performance and accessibility as foundational principles rather than afterthoughts.</p>
            <p className="text-silver">At NSH Media, we are committed to staying at the forefront of these trends, delivering digital experiences that are not only beautiful but also fast, inclusive, and effective.</p>
          </motion.div>

          <motion.div className="mt-12 glass-card p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
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
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 bg-secondary">
        <div className="container-site">
          <motion.h2 className="mb-10 text-section" {...fadeInUp}>Related Posts</motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {relatedPosts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href={`/blog/${post.slug}`} className="glass-card group block overflow-hidden glass-hover">
                  <div className="aspect-[16/10] bg-gradient-to-br from-primary/5 to-[#7C3AED]/5" />
                  <div className="p-5">
                    <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">{post.category}</Badge>
                    <h3 className="mb-2 font-semibold leading-snug group-hover:text-primary">{post.title}</h3>
                    <span className="text-xs text-silver/60">{formatDate(post.date)}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
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
