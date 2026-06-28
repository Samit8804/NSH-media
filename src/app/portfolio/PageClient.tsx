"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PROJECTS_DATA } from "@/data/portfolio"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const categories = ["All", "Web Design", "Development", "Ecommerce", "SEO", "Branding"]

const gradients = [
  "from-[#2563EB] to-[#7C3AED]",
  "from-[#22C55E] to-[#0891B2]",
  "from-[#F59E0B] to-[#EF4444]",
  "from-[#EC4899] to-[#8B5CF6]",
  "from-[#06B6D4] to-[#3B82F6]",
  "from-[#84CC16] to-[#22C55E]",
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.industry.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-hero">
            Our{" "}<span className="text-gradient">Portfolio</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            Explore our work and see how we&apos;ve helped businesses achieve their digital goals.
          </motion.p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)}
                  className={cn("rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                    activeCategory === category ? "bg-primary text-white shadow-lg shadow-primary/25" : "glass text-silver/70 hover:bg-white/10"
                  )}>
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/60" />
              <Input placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="glass pl-10 border-white/10" />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, index) => (
                  <motion.div key={project.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
                    <Link href={`/portfolio/${project.slug}`} className="glass-card group block overflow-hidden glass-hover">
                      <div className={`flex h-56 items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                        <span className="text-6xl font-bold text-white/20">{project.client.charAt(0)}</span>
                      </div>
                      <div className="p-6">
                        <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">{project.category}</Badge>
                        <h2 className="mb-1 text-xl font-bold group-hover:text-primary">{project.title}</h2>
                        <p className="mb-4 text-sm text-silver">{project.client}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-silver/70">{tech}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-silver/70">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                        <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:gap-2">
                          View Project <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                <p className="text-lg text-silver">No projects found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
