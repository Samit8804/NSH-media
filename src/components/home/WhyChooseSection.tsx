"use client"

import { motion } from "framer-motion"
import { Users, Heart, Timer, Zap } from "lucide-react"

const reasons = [
  {
    title: "Expert Team",
    description: "Our skilled professionals bring years of experience across design, development, and strategy.",
    icon: Users,
  },
  {
    title: "Client-First Approach",
    description: "We prioritize your vision and goals, ensuring every decision aligns with your business objectives.",
    icon: Heart,
  },
  {
    title: "Timely Delivery",
    description: "We respect your time with transparent timelines, regular updates, and on-time project delivery.",
    icon: Timer,
  },
  {
    title: "Cutting-Edge Tech",
    description: "We leverage the latest technologies and frameworks to build future-ready digital solutions.",
    icon: Zap,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function WhyChooseSection() {
  return (
    <section className="section-padding bg-background relative">
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
          <h2 className="text-section text-gradient font-heading">Why Choose NSH Media</h2>
          <p className="mt-4 text-lg text-silver max-w-2xl mx-auto">
            We combine creativity with technical excellence to deliver results that matter.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="glass-card glass-hover p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {reason.title}
                </h3>
                <p className="text-silver leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
