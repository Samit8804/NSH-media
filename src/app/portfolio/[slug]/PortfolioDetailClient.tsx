"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, ExternalLink, Quote, ChevronRight } from "lucide-react"
import Link from "next/link"
import { PROJECTS_DATA } from "@/data/portfolio"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, staggerChildren: 0.1 },
}

export default function PortfolioDetailClient({ slug }: { slug: string }) {
  const project = PROJECTS_DATA.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-bg px-6">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-white/10">404</h1>
          <p className="mt-4 text-xl text-silver">Project not found</p>
          <p className="mt-2 text-silver/60">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/portfolio">
            <Button className="mt-8 gap-2 bg-primary text-white hover:bg-primary-hover"><ArrowLeft className="h-4 w-4" /> Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedProjects = PROJECTS_DATA.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-2 text-sm text-silver/60">
            <Link href="/portfolio" className="transition-colors hover:text-white">Portfolio</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{project.title}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
            <Badge className="bg-primary/20 text-primary-hover hover:bg-primary/30">{project.category}</Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            {project.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 flex flex-wrap gap-8 text-silver/60">
            <div><span className="text-sm text-silver/40">Client</span><p className="text-base font-medium text-white">{project.client}</p></div>
            <div><span className="text-sm text-silver/40">Industry</span><p className="text-base font-medium text-white">{project.industry}</p></div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="grid gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2 lg:pr-12">
              <motion.div {...fadeInUp}>
                <h2 className="text-card">Overview</h2>
                <p className="mt-4 leading-relaxed text-silver">{project.overview}</p>
              </motion.div>
              <motion.div {...fadeInUp} className="mt-14">
                <h2 className="text-card">The Challenge</h2>
                <p className="mt-4 leading-relaxed text-silver">{project.challenge}</p>
              </motion.div>
              <motion.div {...fadeInUp} className="mt-14">
                <h2 className="text-card">The Solution</h2>
                <p className="mt-4 leading-relaxed text-silver">{project.solution}</p>
              </motion.div>
              <motion.div {...fadeInUp} className="mt-14">
                <h2 className="text-card">Results</h2>
                <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mt-6 space-y-4">
                  {project.results.map((result, index) => (
                    <motion.li key={index} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/10">
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <span className="text-silver">{result}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {project.testimonial && (
                <motion.div {...fadeInUp} className="mt-14">
                  <h2 className="text-card">What Our Client Says</h2>
                  <div className="glass-card relative mt-6 p-8">
                    <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/10" />
                    <p className="text-lg leading-relaxed italic text-silver">&ldquo;{project.testimonial.content}&rdquo;</p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {project.testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold">{project.testimonial.name}</p>
                        <p className="text-sm text-silver">{project.testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <motion.div {...fadeInUp} className="sticky top-24 space-y-8">
                <div className="glass-card p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-silver/60">Technologies Used</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="rounded-[10px] border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-silver/70">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-silver/60">Project Gallery</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-[#7C3AED]/10 text-xs text-primary/50">Screenshot {i}</div>
                    ))}
                  </div>
                </div>

                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-hover hover:shadow-lg">
                    <ExternalLink className="h-4 w-4" /> Visit Live Project
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="border-t border-white/10 px-6 py-20">
          <div className="container-site">
            <motion.div {...fadeInUp}>
              <h2 className="text-card">Related Projects</h2>
              <p className="mt-2 text-silver">More projects in {project.category}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((related, index) => (
                <motion.div key={related.slug} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } } }}>
                  <Link href={`/portfolio/${related.slug}`} className="glass-card group block overflow-hidden glass-hover">
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary/5 to-[#7C3AED]/5">
                      <span className="text-4xl font-bold text-primary/20">{related.client.charAt(0)}</span>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium text-primary">{related.category}</span>
                      <h3 className="mt-1 text-base font-semibold group-hover:text-primary">{related.title}</h3>
                      <p className="mt-1 text-sm text-silver">{related.client}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className="border-t border-white/10 px-6 py-12">
        <div className="container-site">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-silver/60 transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="container-site">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="text-subsection">Keep Exploring</h2>
            <p className="mt-3 text-silver">Discover more projects and insights</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/portfolio?category=${encodeURIComponent(project.category)}`}>
                <Button variant="outline" className="gap-2 border-white/10 text-white hover:bg-white/10">
                  More Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="gap-2 border-white/10 text-white hover:bg-white/10">
                  Read Our Blog <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
