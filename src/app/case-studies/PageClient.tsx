"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, DollarSign, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-hero">
            Case{" "}<span className="text-gradient">Studies</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            See how we have helped businesses achieve remarkable results through strategic digital solutions.
          </motion.p>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <motion.div className="relative container-site max-w-xl text-center" {...fadeInUp}>
          <h2 className="text-subsection mb-4">Want Results Like These?</h2>
          <p className="mb-8 text-lg text-silver">Let&apos;s discuss how we can help your business achieve measurable growth.</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">Start Your Journey <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
