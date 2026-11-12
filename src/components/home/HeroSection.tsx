"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const fadeUpSmall = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-mesh-hero" />
      <div className="absolute inset-0 bg-grid-subtle" />
      {Array.from({ length: 40 }).map((_, i) => {
        const x = ((i * 37 + 13) * 7.3) % 100
        const y = ((i * 53 + 7) * 11.7) % 100
        const dur = 6 + ((i * 41 + 3) % 60) / 10
        const delay = ((i * 29 + 17) % 60) / 10
        return (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animation: `float ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        )
      })}
      <div className="container-site relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 min-h-screen py-24 lg:py-0">
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={fadeUpSmall} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-silver mb-8">
              <span className="w-2 h-2 rounded-full bg-primary" />
              NSH Media Services · Visual Solutions
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-hero text-foreground">
              <span className="block">Web Design & Development</span>
              <span className="block">for Growing Businesses</span>
            </motion.h1>

            <motion.p variants={fadeUpSmall} className="mt-6 text-lg text-silver max-w-xl leading-relaxed mx-auto lg:mx-0">
              NSH Media Services is a digital design and development studio.
              We plan, design, and build websites, web applications, and online
              stores that are clear, fast, and easy to manage.
            </motion.p>

            <motion.div variants={fadeUpSmall} className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/contact">
                <Button size="xl" className="bg-primary text-white glow-blue hover:bg-primary-hover px-10">
                  Start a Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="xl" variant="outline" className="glass text-foreground hover:bg-white/10 px-10">
                  View Portfolio
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-[100px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
