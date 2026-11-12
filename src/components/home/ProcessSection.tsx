"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn about your business, goals, and audience.",
    detail: "We discuss what the website needs to achieve, who it serves, and what content and systems are already in place. The scope and milestones are agreed before work begins.",
  },
  {
    number: "02",
    title: "Structure",
    description: "We map pages, journeys, and technical requirements.",
    detail: "We define the site structure, navigation, content plan, and technical requirements so design and development start from a clear foundation.",
  },
  {
    number: "03",
    title: "Design",
    description: "We create wireframes and responsive page designs.",
    detail: "We move from low-fidelity structure to high-fidelity page designs and reusable components. You review the work before development begins.",
  },
  {
    number: "04",
    title: "Development",
    description: "We build with modern frameworks and clean code.",
    detail: "We implement the design as a responsive, maintainable website or application, with attention to performance, accessibility, and technical SEO foundations.",
  },
  {
    number: "05",
    title: "Testing",
    description: "We test key journeys before launch.",
    detail: "We check forms, links, responsive layouts, and the main user journeys across browsers and devices, then resolve issues before the site goes live.",
  },
  {
    number: "06",
    title: "Launch",
    description: "We deploy the site and hand over what you need.",
    detail: "We deploy to production, confirm analytics and forms are working, and provide the access and documentation needed to manage the parts of the site you own.",
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
                  <p className="text-xs text-silver/70 leading-relaxed max-w-[180px] mt-2">
                    {step.detail}
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
