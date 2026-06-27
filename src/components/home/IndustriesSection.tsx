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

const industries = [
  { name: "Healthcare", icon: HeartPulse, slug: "healthcare" },
  { name: "Finance", icon: Banknote, slug: "finance" },
  { name: "E-Commerce", icon: ShoppingBag, slug: "e-commerce" },
  { name: "Education", icon: GraduationCap, slug: "education" },
  { name: "Real Estate", icon: Building2, slug: "real-estate" },
  { name: "Technology", icon: Cpu, slug: "technology" },
  { name: "Hospitality", icon: Hotel, slug: "hospitality" },
  { name: "Startups", icon: Briefcase, slug: "startups" },
]

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
            Domain expertise across diverse sectors to deliver tailored solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                variants={cardVariants}
                className="glass-card glass-hover p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {industry.name}
                </h3>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0 inline-flex items-center gap-1"
                >
                  Learn More &rarr;
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
