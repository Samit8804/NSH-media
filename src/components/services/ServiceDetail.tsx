"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ServiceDetailProps {
  title: string
  description: string
  benefits: string[]
  features: string[]
  process: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  icon: React.ReactNode
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const lineVariant = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
}

export default function ServiceDetail({
  title,
  description,
  benefits,
  features,
  process,
  faqs,
  icon,
}: ServiceDetailProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-zinc-950 to-zinc-950" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-400"
          >
            {icon}
            <span>{title}</span>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            {description}
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Why Choose Our {title} Service
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              We deliver measurable results through a proven approach
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardItem}
                className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-800"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                  <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Features We Deliver
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Every feature is designed with your success in mind
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardItem}
                className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                  <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-base font-medium text-zinc-900 dark:text-white">
                    {feature}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Our Process
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              A proven methodology that delivers exceptional results
            </p>
          </motion.div>
          <div className="relative mx-auto max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={lineVariant}
              className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-indigo-500 via-indigo-500/50 to-transparent"
            />
            <div className="space-y-12">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                  className="relative pl-16"
                >
                  <div className="absolute left-4 top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-indigo-500 bg-white dark:bg-zinc-950">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <span className="mb-1 inline-flex items-center justify-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-zinc-200 dark:border-zinc-800"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-zinc-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700"
        >
          <div className="relative px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-indigo-100">
              Let&apos;s discuss how our {title.toLowerCase()} service can help your business grow.
            </p>
            <Link
              href="/contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-indigo-700 transition-all hover:bg-indigo-50 hover:shadow-xl"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
