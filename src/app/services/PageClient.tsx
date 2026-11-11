"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Globe, Code, ShoppingCart, Search, Palette, BrainCircuit, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Design: Palette,
  Code,
  Code2: Code,
  Development: Code,
  ShoppingCart,
  ECommerce: ShoppingCart,
  Search,
  SEO: Search,
  Globe,
  Branding: Globe,
  Fingerprint: Globe,
  BrainCircuit,
  AI: BrainCircuit,
  Automation: BrainCircuit,
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export interface ServiceCard {
  id?: string
  title: string
  slug: string
  description: string
  icon: string
  price?: string
}

interface ServicesPageProps {
  services?: ServiceCard[]
}

export default function ServicesPage({ services }: ServicesPageProps) {
  const items = services ?? []

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
          {items.length === 0 ? (
            <div className="mx-auto max-w-2xl glass-card p-12 text-center">
              <h2 className="mb-4 text-2xl font-bold">Our services are coming soon</h2>
              <p className="text-silver">We are currently onboarding new projects. Check back soon to explore our full service offerings.</p>
            </div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => {
                const Icon = iconMap[service.icon] ?? Palette
                return (
                  <motion.div key={service.slug} variants={cardVariants} className="glass-card group relative overflow-hidden p-8 glass-hover">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                    <div className="relative">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-card mb-3">{service.title}</h2>
                      <p className="mb-6 leading-relaxed text-silver">{service.description}</p>
                      <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">
                        Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
