"use client"

import { motion } from "framer-motion"
import {
  HeartPulse,
  Banknote,
  ShoppingBag,
  GraduationCap,
  Building2,
  Cpu,
  Hotel,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { INDUSTRIES } from "@/data/industries";
import type { LucideIcon } from "lucide-react";

const industryIcons: Record<string, LucideIcon> = {
  healthcare: HeartPulse,
  finance: Banknote,
  "e-commerce": ShoppingBag,
  ecommerce: ShoppingBag,
  education: GraduationCap,
  "real-estate": Building2,
  technology: Cpu,
  hospitality: Hotel,
  startups: Briefcase,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function IndustriesSection() {
  return (
    <section className="section-padding bg-secondary relative">
      <div className="absolute inset-0 bg-mesh" />
      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-section text-gradient font-heading">Industries We Serve</h2>
          <p className="mt-4 text-lg text-silver max-w-2xl mx-auto">
            See how our three core services apply to different sectors and
            audiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {INDUSTRIES.map((industry) => {
            const Icon = industryIcons[industry.slug] ?? Briefcase
            return (
              <motion.div
                key={industry.name}
                variants={cardVariants}
                className="glass-card glass-hover group p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {industry.name}
                </h3>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="text-xs font-medium text-primary transition-all duration-300 inline-flex items-center gap-1 sm:opacity-0 sm:-translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
                >
                  Learn More &rarr;
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 glass-card p-8 md:p-10"
        >
          <h2 className="text-section text-gradient font-heading text-center mb-6">Why Work With NSH Media Services</h2>
          <div className="max-w-4xl mx-auto space-y-4 text-silver leading-relaxed">
            <p>
              NSH Media Services focuses on web design, web development, and
              e-commerce. Every project starts by understanding your market,
              audience, and goals so the site is built around a clear purpose
              rather than a template.
            </p>
            <p>
              Because our work is concentrated in three connected services, we
              can carry a project from early structure and visual design through
              development and launch without handing it between unrelated teams.
              We agree the scope and milestones in writing and keep
              communication direct throughout.
            </p>
            <p>
              We work with startups, established businesses, and organisations
              across the industries above. If you are planning a new website, a
              redesign, or an online store, we will tell you honestly whether we
              are the right fit for the work.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
