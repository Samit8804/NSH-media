"use client"

import { motion } from "framer-motion"

const logos = [
  "GOOGLE", "MICROSOFT", "AMAZON", "FIGMA",
  "VERCEL", "NOTION", "SLACK", "DRIBBBLE",
  "GOOGLE", "MICROSOFT", "AMAZON", "FIGMA",
]

export default function TrustedBySection() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-site">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-medium text-silver uppercase tracking-[0.2em] mb-10"
        >
          Trusted by industry leaders
        </motion.p>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex overflow-hidden"
          >
            <motion.div
              animate={{ x: [0, -1536] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-16 shrink-0"
            >
              {logos.map((logo, i) => (
                <span
                  key={`${logo}-${i}`}
                  className="text-lg font-bold font-heading text-white/20 tracking-wider whitespace-nowrap hover:text-primary transition-colors duration-300"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
            <motion.div
              animate={{ x: [0, -1536] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-16 shrink-0"
              aria-hidden
            >
              {logos.map((logo, i) => (
                <span
                  key={`clone-${logo}-${i}`}
                  className="text-lg font-bold font-heading text-white/20 tracking-wider whitespace-nowrap"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
