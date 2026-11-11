"use client"

import { motion } from "framer-motion"
import { Globe, Code, ShoppingCart, Search, Palette, BrainCircuit, type LucideIcon } from "lucide-react"
import Link from "next/link"

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export interface ServiceCard {
  id?: string
  title: string
  slug: string
  description: string
  fullDescription?: string
  icon: string
  price?: string
}

interface ServicesPageProps {
  services?: ServiceCard[]
}

export default function ServicesPage({ services }: ServicesPageProps) {
  const items = services ?? []

  if (items.length === 0) {
    return (
      <section id="services" className="section-padding bg-background relative">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="container-site relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-section text-gradient font-heading">Our Services</h2>
            <p className="mt-4 text-lg text-silver max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs.
            </p>
          </div>
          <div className="mx-auto max-w-2xl glass-card p-12 text-center">
            <h3 className="mb-3 text-2xl font-bold">Our services are coming soon</h3>
            <p className="text-silver">We are currently onboarding new projects. Check back soon to explore our full service offerings.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="section-padding bg-background relative">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid-subtle" />
      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-section text-gradient font-heading">Our Services</h2>
          <p className="mt-4 text-lg text-silver max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((service) => {
            const Icon = iconMap[service.icon] ?? Palette
            return (
              <motion.div
                key={service.slug}
                variants={cardVariants}
                className="glass-card glass-hover p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-silver leading-relaxed mb-3">
                  {service.description}
                </p>
                <p className="text-sm text-silver leading-relaxed mb-5 opacity-80">
                  {service.fullDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm font-medium text-primary inline-flex items-center gap-1 group/link"
                >
                  Learn More
                  <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
