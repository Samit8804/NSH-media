"use client"

import { motion } from "framer-motion"
import { Palette, Code2, ShoppingCart, Search, Fingerprint, Brain, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SERVICES_DATA } from "@/data/services"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Code2, ShoppingCart, Search, Fingerprint, Brain,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-hero">
            Our{" "}<span className="text-gradient">Services</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            We deliver comprehensive digital solutions that help businesses grow, innovate, and succeed in the modern landscape.
          </motion.p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((service) => {
              const IconComponent = iconMap[service.icon]
              return (
                <motion.div key={service.slug} variants={cardVariants} className="glass-card group relative overflow-hidden p-8 glass-hover">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                  <div className="relative">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                      {IconComponent && <IconComponent className="h-8 w-8" />}
                    </div>
                    <h3 className="text-card mb-3">{service.title}</h3>
                    <p className="mb-6 leading-relaxed text-silver">{service.description}</p>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">
                      Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
