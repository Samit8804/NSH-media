"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function FinalCTASection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="container-site relative z-10">
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass p-12 md:p-16 rounded-[24px] text-center max-w-4xl mx-auto glow-blue"
        >
          <motion.h2
            variants={fadeUp}
            className="text-section font-heading text-foreground max-w-3xl mx-auto leading-tight"
          >
            Ready to Start Your Project?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-silver max-w-xl mx-auto"
          >
            Let&apos;s build something amazing together. Get a free consultation today.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="xl"
                className="bg-accent text-accent-foreground glow-amber hover:bg-amber-500 px-10 font-semibold"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="xl"
                className="glass text-foreground hover:bg-white/10 px-10"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Call
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
