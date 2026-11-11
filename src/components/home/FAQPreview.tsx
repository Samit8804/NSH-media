"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

interface FAQ {
  question: string
  answer: string
}

interface FAQPreviewProps {
  faqs?: FAQ[]
}

export default function FAQPreview({ faqs }: FAQPreviewProps) {
  const items = faqs ?? []

  if (items.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-background relative">
      <div className="absolute inset-0 bg-grid-subtle" />
      <div className="container-site max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-section text-gradient font-heading">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-silver">
              Everything you need to know before getting started.
            </p>
          </div>
          <Link href="/faq" className="hidden sm:block">
            <Button variant="ghost" className="text-silver hover:text-foreground">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AccordionPrimitive.Root type="single" collapsible className="w-full space-y-3">
            {items.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionPrimitive.Item
                  value={`item-${index}`}
                  className="glass-card overflow-hidden"
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between px-6 py-5 text-[15px] font-medium text-foreground transition-all hover:text-primary text-left [&[data-state=open]>svg]:rotate-45">
                      {faq.question}
                      <Plus className="h-4 w-4 shrink-0 text-silver transition-transform duration-300" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-6 pb-5 text-sm text-silver leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              </motion.div>
            ))}
          </AccordionPrimitive.Root>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link href="/faq">
            <Button variant="ghost" className="rounded-full text-silver">
              View All FAQs
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
