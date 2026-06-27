"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn about your business, goals, and target audience to define project scope.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We create a detailed roadmap, timeline, and technical strategy for your project.",
  },
  {
    number: "03",
    title: "Design",
    description: "Our designers craft intuitive interfaces and engaging visual experiences.",
  },
  {
    number: "04",
    title: "Development",
    description: "We build your product using modern frameworks and best coding practices.",
  },
  {
    number: "05",
    title: "Testing",
    description: "Rigorous quality assurance ensures everything performs flawlessly.",
  },
  {
    number: "06",
    title: "Launch",
    description: "We deploy your product and provide ongoing support for continued success.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-secondary relative">
      <div className="absolute inset-0 bg-grid-subtle" />
      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-section text-gradient font-heading">Our Process</h2>
          <p className="mt-4 text-lg text-silver max-w-2xl mx-auto">
            How we bring your vision to life, step by step.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="hidden lg:block absolute top-16 left-[calc(8.33%+30px)] right-[calc(8.33%+30px)] h-[2px] bg-gradient-to-r from-primary/10 via-primary to-primary/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center"
              >
                <div className="glass-card w-16 h-16 flex items-center justify-center mb-5 glow-blue-subtle">
                  <span className="text-lg font-bold font-heading text-primary">{step.number}</span>
                </div>
                <div className="lg:mt-2">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-silver leading-relaxed max-w-[180px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
