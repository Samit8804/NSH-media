"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  label: string
}

function Counter({ target, suffix = "", prefix = "", label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    const duration = 2000
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-silver mt-3 text-base font-medium">{label}</div>
    </div>
  )
}

const stats = [
  { target: 150, suffix: "+", label: "Projects Delivered" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
  { target: 50, suffix: "+", label: "Businesses Served" },
  { target: 5, suffix: "+", label: "Years Experience" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function StatisticsCounter() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-mesh" />
      <div className="container-site relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="glass-card p-8 glow-blue-subtle">
              <Counter target={stat.target} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
