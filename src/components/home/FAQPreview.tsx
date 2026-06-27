"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

const faqs = [
  {
    question: "What services does NSH Media offer?",
    answer: "We offer a comprehensive range of digital services including web design, web development, e-commerce solutions, SEO optimization, branding, ongoing maintenance, AI automation, and custom web application development.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A standard website typically takes 4-8 weeks, while more complex web applications can take 8-16 weeks. We provide detailed timelines during our discovery phase.",
  },
  {
    question: "What is your design and development process?",
    answer: "Our process follows six key phases: Discovery, Strategy, Design, Development, Testing, and Launch. We maintain transparent communication throughout, providing regular updates and opportunities for feedback at each stage.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we offer comprehensive maintenance packages to keep your digital products running smoothly. This includes security updates, performance monitoring, content updates, and technical support.",
  },
  {
    question: "How much do your services cost?",
    answer: "Pricing depends on the scope and complexity of your project. We provide tailored quotes after understanding your specific requirements during an initial consultation. Contact us for a free estimate.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function FAQPreview() {
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
            {faqs.map((faq, index) => (
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
