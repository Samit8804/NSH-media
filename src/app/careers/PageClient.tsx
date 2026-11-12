"use client"

import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Briefcase className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h1 className="text-hero mb-6">
              Careers at{" "}
              <span className="text-gradient">NSH Media Services</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-silver">
              We do not have any paid roles listed at the moment. This page will
              be updated when a verified position opens.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div {...fadeInUp}>
            <h2 className="text-section mb-6">What we hire for</h2>
            <p className="leading-relaxed text-silver">
              Our work covers web design, web development, and e-commerce. When
              roles do open, they will be listed here with the responsibilities,
              requirements, location arrangement, and application instructions.
            </p>
            <p className="mt-4 leading-relaxed text-silver">
              We do not publish salary ranges, benefits, or team details unless
              they have been confirmed for a specific open role.
            </p>
          </motion.div>

          <motion.div className="glass-card mt-12 p-8" {...fadeInUp}>
            <h2 className="text-card mb-3">Introduce yourself</h2>
            <p className="leading-relaxed text-silver">
              If you would like us to keep your details for a future role, send a
              short introduction and a link to relevant work. There is no
              application form on this page right now.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="gap-2 bg-primary text-white hover:bg-primary-hover">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="gap-2 border-white/10 text-white hover:bg-white/10"
                >
                  About NSH Media Services
                </Button>
              </Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-silver/70">
              <Mail className="h-4 w-4" />
              Use the contact form and mention that your message is about future
              work.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
