"use client"

import { motion } from "framer-motion"
import { ArrowRight, BarChart3, LineChart, Layers, PieChart } from "lucide-react"
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

const stats = [
  { value: "150+", label: "Projects", icon: BarChart3 },
  { value: "98%", label: "Satisfaction", icon: Layers },
  { value: "50+", label: "Clients", icon: PieChart },
  { value: "5+", label: "Years", icon: LineChart },
]

const floatingCards = [
  { className: "top-12 -right-4 w-56 animate-float", gradient: "from-blue-500/10 to-indigo-500/5", lines: 4 },
  { className: "top-48 right-20 w-52 animate-float-delayed", gradient: "from-emerald-500/10 to-teal-500/5", lines: 3 },
  { className: "bottom-32 -right-8 w-60 animate-float-slow", gradient: "from-purple-500/10 to-pink-500/5", lines: 5 },
  { className: "bottom-12 left-4 w-48 animate-float", gradient: "from-amber-500/10 to-orange-500/5", lines: 2 },
]

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
              Premium Digital Agency
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-hero text-foreground">
              <span className="block">A Premium Digital Agency</span>
              <span className="block">Building Digital Experiences</span>
            </motion.h1>

            <motion.p variants={fadeUpSmall} className="mt-6 text-lg text-silver max-w-xl leading-relaxed mx-auto lg:mx-0">
              We craft digital products that combine stunning design with powerful technology to help your business thrive in the modern era.
            </motion.p>

            <motion.div variants={fadeUpSmall} className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/contact">
                <Button size="xl" className="bg-primary text-white glow-blue hover:bg-primary-hover px-10">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="xl" variant="outline" className="glass text-foreground hover:bg-white/10 px-10">
                  View Portfolio
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUpSmall} className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto lg:mx-0">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-xl font-bold font-heading text-foreground">{stat.value}</span>
                    </div>
                    <div className="text-xs text-silver">{stat.label}</div>
                  </div>
                )
              })}
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

              <div className="glass-card animate-float p-4 absolute top-4 -right-2 w-56">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">N</div>
                  <div className="flex-1">
                    <div className="h-2 w-20 rounded-full bg-white/10" />
                    <div className="h-1.5 w-14 rounded-full bg-white/5 mt-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-primary/30 to-transparent w-full" />
                  <div className="h-2 rounded-full bg-gradient-to-r from-primary/20 to-transparent w-3/4" />
                  <div className="h-2 rounded-full bg-white/10 w-5/6" />
                  <div className="h-2 rounded-full bg-white/10 w-2/3" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 rounded-xl bg-white/5 border border-white/5 p-2">
                      <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                      <div className="h-1.5 w-3/5 rounded-full bg-white/5 mt-1.5" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card animate-float-delayed p-4 absolute top-32 right-8 w-52">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-silver font-medium">Analytics</span>
                  <span className="text-[10px] text-primary">+12.5%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-end gap-1 h-16">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-primary to-primary/30 rounded-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card animate-float-slow p-4 absolute bottom-36 -right-4 w-60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <div>
                    <div className="h-2 w-16 rounded-full bg-white/10" />
                    <div className="h-1.5 w-10 rounded-full bg-white/5 mt-1" />
                  </div>
                </div>
                <div className="flex gap-2">
                  {[40, 60, 35, 75, 50].map((w, i) => (
                    <div key={i} className="h-6 bg-white/10 rounded-sm flex-1" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>

              <div className="glass-card p-3 absolute bottom-16 left-0 w-44" style={{ animation: "float 7s ease-in-out 0.5s infinite" }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="h-1.5 w-12 rounded-full bg-white/10" />
                  <div className="h-1.5 w-8 rounded-full bg-white/5 ml-auto" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
