"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

export interface PricingPlan {
  id?: string
  name: string
  slug: string
  price: number
  description?: string | null
  features?: string[]
  highlighted?: boolean
  popular?: boolean
}

interface PricingPageProps {
  plans?: PricingPlan[]
}

export default function PricingPage({ plans }: PricingPageProps) {
  const [annual, setAnnual] = useState(false)

  const formatPrice = (monthly: number) => {
    if (!monthly) return "Custom"
    const yearly = monthly * 12 * 0.8
    return annual ? `$${yearly.toLocaleString()}` : `$${monthly.toLocaleString()}`
  }

  const periodLabel = annual ? "/year" : "/month"

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-hero">
            Simple,{" "}<span className="text-gradient">Transparent Pricing</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            No surprises, no hidden fees. Choose the plan that fits your needs and scale as you grow.
          </motion.p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <motion.div className="mb-12 flex items-center justify-center gap-4" {...fadeInUp}>
            <span className={cn("text-sm font-medium", !annual ? "text-white" : "text-silver/60")}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className={cn("relative inline-flex h-7 w-12 items-center rounded-full transition-colors", annual ? "bg-primary" : "bg-white/20")}>
              <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white transition-transform", annual ? "translate-x-[26px]" : "translate-x-[3px]")} />
            </button>
            <span className={cn("text-sm font-medium", annual ? "text-white" : "text-silver/60")}>
              Annual <span className="ml-1.5 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">Save 20%</span>
            </span>
          </motion.div>

          {(!plans || plans.length === 0) ? (
            <div className="mx-auto max-w-2xl glass-card p-12 text-center">
              <h2 className="mb-4 text-2xl font-bold">Pricing coming soon</h2>
              <p className="text-silver">We are finalizing our plans. Check back soon.</p>
            </div>
          ) : (
            <motion.div className="grid gap-8 lg:grid-cols-3" {...stagger}>
              {plans.map((plan) => (
                <motion.div key={plan.slug || plan.name} className={cn("glass relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-1", plan.highlighted ? "glow-blue-subtle border-primary/30" : "")} {...stagger}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white shadow-lg">Most Popular</span>
                  )}
                  <h3 className="mb-1 text-xl font-bold">{plan.name}</h3>
                  <p className="mb-4 text-sm text-silver/70">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                    {plan.price > 0 && <span className="ml-1 text-sm text-silver/60">{periodLabel}</span>}
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {(plan.features ?? []).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /><span>{f}</span></li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary/10">Contact Us <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <motion.div className="relative container-site max-w-xl text-center" {...fadeInUp}>
          <h2 className="text-subsection mb-4">Still Have Questions?</h2>
          <p className="mb-8 text-lg text-silver">Our team is ready to help you find the right plan for your business.</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">Contact Sales <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
