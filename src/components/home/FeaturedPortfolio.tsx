"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projects = [
  {
    title: "Velocity Finance",
    category: "Web Application",
    gradient: "from-blue-600 to-indigo-700",
    tech: ["React", "Node.js", "MongoDB"],
    slug: "velocity-finance",
  },
  {
    title: "GreenLeaf Organics",
    category: "E-Commerce",
    gradient: "from-emerald-500 to-green-700",
    tech: ["Next.js", "Stripe", "Tailwind"],
    slug: "greenleaf-organics",
  },
  {
    title: "PrimeCloud Hub",
    category: "SaaS Platform",
    gradient: "from-purple-600 to-pink-700",
    tech: ["React", "AWS", "GraphQL"],
    slug: "primecloud-hub",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function FeaturedPortfolio() {
  return (
    <section id="portfolio" className="section-padding relative">
      <div className="absolute inset-0 bg-grid-subtle" />
      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <h2 className="text-section text-gradient font-heading">Featured Work</h2>
            <p className="mt-4 text-lg text-silver max-w-xl">
              A selection of our recent projects that showcase our expertise.
            </p>
          </div>
          <Link href="/portfolio" className="hidden sm:block">
            <Button variant="outline" className="glass text-foreground">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group relative rounded-[20px] overflow-hidden cursor-pointer glass-card"
            >
              <div className={`h-72 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-white/10 text-7xl font-bold tracking-tighter font-heading select-none group-hover:scale-110 transition-transform duration-500">
                  {project.title.charAt(0)}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 glass flex flex-col justify-end p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/30 backdrop-blur-sm text-white text-xs font-medium mb-2 w-fit">
                    {project.category}
                  </span>
                  <h3 className="text-white text-xl font-heading font-bold">{project.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white/10 text-white/70 text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                  {project.category}
                </span>
                <h3 className="text-lg font-heading font-semibold text-foreground">{project.title}</h3>
                <div className="mt-3 inline-flex items-center gap-1 text-primary text-sm font-medium group/link">
                  View Project
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center sm:hidden"
        >
          <Link href="/portfolio">
            <Button variant="outline" className="glass text-foreground">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
