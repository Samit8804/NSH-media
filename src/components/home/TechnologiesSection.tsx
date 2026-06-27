"use client"

import { motion } from "framer-motion"

const technologies = [
  "Next.js", "React", "TypeScript", "Node.js",
  "MongoDB", "AWS", "Vercel", "Tailwind CSS",
  "Framer Motion", "GraphQL", "Docker", "Figma",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function TechnologiesSection() {
  return (
    <section className="section-padding bg-background relative">
      <div className="absolute inset-0 bg-grid-subtle" />
      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-section text-gradient font-heading">Our Technology Stack</h2>
          <p className="mt-4 text-lg text-silver max-w-2xl mx-auto">
            Modern tools and frameworks that power our digital solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold glass text-foreground transition-all duration-300 hover:bg-white/10 hover:border-primary/30 hover:-translate-y-0.5 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
