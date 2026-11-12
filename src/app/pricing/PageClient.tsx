"use client"

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
  const formatPrice = (price: number) =>
    price > 0 ? `$${price.toLocaleString()}` : "Custom"

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-hero">
            Simple,{" "}<span className="text-gradient">Transparent Pricing</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            Published starting prices for our website packages. The final scope,
            timeline, and cost are agreed in writing before work begins.
          </motion.p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          {(!plans || plans.length === 0) ? (
            <div className="mx-auto max-w-2xl glass-card p-12 text-center">
              <h2 className="mb-4 text-2xl font-bold">Pricing coming soon</h2>
              <p className="text-silver">We are finalizing our plans. Check back soon.</p>
            </div>
          ) : (
            <motion.div className="grid gap-8 lg:grid-cols-3" {...stagger}>
              {plans.map((plan) => (
                <motion.div id={plan.slug} key={plan.slug || plan.name} className={cn("glass relative flex flex-col scroll-mt-28 p-8 transition-all duration-300 hover:-translate-y-1", plan.highlighted ? "glow-blue-subtle border-primary/30" : "")} {...stagger}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white shadow-lg">Most Popular</span>
                  )}
                  <h3 className="mb-1 text-xl font-bold">{plan.name}</h3>
                  <p className="mb-4 text-sm text-silver/70">{plan.description}</p>
                  <div className="mb-6">
                    {plan.price > 0 && (
                      <span className="mr-2 text-sm text-silver/60">From</span>
                    )}
                    <span className="text-4xl font-bold">
                      {formatPrice(plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="ml-2 text-sm text-silver/60">
                        project-based
                      </span>
                    )}
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
          <p className="mb-8 text-lg text-silver">
            Tell us what you need and we will recommend a scope that fits your
            project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">Discuss Your Project <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
