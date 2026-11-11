"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

interface Faq {
  question: string
  answer: string
}

interface FAQPageProps {
  faqsByCategory?: Record<string, Faq[]>
  categories?: string[]
}

export default function FAQPage({ faqsByCategory, categories }: FAQPageProps) {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState(categories?.[0] || "General")

  const tabs = categories && categories.length > 0 ? categories : ["General"]
  const currentFaqs = faqsByCategory?.[activeTab] || []

  const filtered = search
    ? currentFaqs.filter((f) => f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()))
    : currentFaqs

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <HelpCircle className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h1 className="text-hero mb-6">
              Frequently Asked{" "}<span className="text-gradient">Questions</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
              Everything you need to know about NSH Media. Cannot find what you are looking for? Reach out to our team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site max-w-3xl">
          <motion.div className="mb-8" {...fadeInUp}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/60" />
              <Input placeholder="Search FAQs..." value={search} onChange={(e) => setSearch(e.target.value)} className="glass pl-10 h-12 text-base border-white/10" />
            </div>
          </motion.div>

          <motion.div className="mb-10 flex flex-wrap gap-2" {...fadeInUp}>
            {tabs.map((tab) => (
              <button key={tab} onClick={() => { setActiveTab(tab); setSearch("") }}
                className={cn("rounded-full px-5 py-2 text-sm font-medium transition-all",
                  activeTab === tab ? "bg-primary text-white shadow-lg shadow-primary/25" : "glass text-silver/70 hover:bg-white/10"
                )}>
                {tab}
              </button>
            ))}
          </motion.div>

          {filtered.length === 0 ? (
            <motion.p className="py-12 text-center text-silver/60" {...fadeInUp}>No FAQs match your search. Try a different term.</motion.p>
          ) : (
            <motion.div key={`${activeTab}-${search}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {filtered.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="glass-card !rounded-xl overflow-hidden border-0 [&[data-state=open]]:border [&[data-state=open]]:border-primary/30">
                    <AccordionTrigger className="text-left font-medium px-6 py-4 hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-silver px-6 pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <motion.div className="relative container-site max-w-xl text-center" {...fadeInUp}>
          <h2 className="text-subsection mb-4">Still Have Questions?</h2>
          <p className="mb-8 text-lg text-silver">Our support team is ready to help. Reach out and we will get back to you within 24 hours.</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
