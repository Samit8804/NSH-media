"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, ArrowRight, HelpCircle } from "lucide-react"
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
  transition: { duration: 0.5, staggerChildren: 0.1 },
}

const plans = [
  {
    name: "Starter", monthly: 499,
    description: "Perfect for small businesses and startups looking to establish their digital presence.",
    popular: false,
    features: ["Custom website design (up to 5 pages)", "Mobile responsive development", "Basic SEO optimization", "1 round of revisions", "Hosting setup assistance", "3 months email support"],
    notIncluded: ["Content management system", "E-commerce integration", "Analytics setup", "Social media integration"],
  },
  {
    name: "Business", monthly: 1499,
    description: "Ideal for growing businesses that need a robust, scalable digital solution.",
    popular: true,
    features: ["Custom website design (up to 15 pages)", "Mobile responsive development", "Advanced SEO optimization", "3 rounds of revisions", "CMS integration", "Analytics & tracking setup", "Social media integration", "6 months priority support"],
    notIncluded: ["E-commerce integration", "Custom API development"],
  },
  {
    name: "Premium", monthly: 3999,
    description: "For established enterprises demanding a comprehensive, high-performance digital ecosystem.",
    popular: false,
    features: ["Custom website design (unlimited pages)", "Mobile responsive development", "Enterprise SEO strategy", "Unlimited revisions", "Advanced CMS integration", "E-commerce integration", "Custom API development", "Analytics dashboard", "12 months dedicated support", "Performance optimization"],
    notIncluded: [],
  },
  {
    name: "Enterprise", monthly: null,
    description: "Tailored solutions for large organizations with unique requirements and complex workflows.",
    popular: false, custom: true,
    features: ["Everything in Premium", "Dedicated project manager", "Custom feature development", "Third-party integrations", "SLA guarantees", "24/7 priority support", "Team training sessions", "Ongoing maintenance"],
    notIncluded: [],
  },
]

const comparisonRows = [
  { feature: "Custom Design", starter: true, business: true, premium: true, enterprise: true },
  { feature: "Mobile Responsive", starter: true, business: true, premium: true, enterprise: true },
  { feature: "SEO Optimization", starter: "Basic", business: "Advanced", premium: "Enterprise", enterprise: true },
  { feature: "CMS Integration", starter: false, business: true, premium: true, enterprise: true },
  { feature: "E-commerce", starter: false, business: false, premium: true, enterprise: true },
  { feature: "Custom API", starter: false, business: false, premium: true, enterprise: true },
  { feature: "Dedicated Manager", starter: false, business: false, premium: false, enterprise: true },
  { feature: "Support Duration", starter: "3 months", business: "6 months", premium: "12 months", enterprise: "24/7" },
]

const faqs = [
  { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of the next billing cycle." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for annual plans." },
  { q: "Is there a setup fee?", a: "No hidden setup fees. Your monthly or annual subscription covers everything included in your plan." },
  { q: "Do you offer refunds?", a: "Yes, we offer a 14-day money-back guarantee on all plans. See our refund policy for details." },
  { q: "Can I customize my plan?", a: "Absolutely. Enterprise plans are fully customizable, and we can often accommodate custom requests on Premium plans." },
  { q: "What happens after my project is complete?", a: "We provide ongoing support based on your plan. You can also purchase additional maintenance hours as needed." },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  const formatPrice = (monthly: number | null) => {
    if (monthly === null) return "Custom"
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

          <motion.div className="grid gap-8 lg:grid-cols-4" {...stagger}>
            {plans.map((plan) => (
              <motion.div key={plan.name} className={cn("glass relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-1", plan.popular ? "glow-blue-subtle border-primary/30" : "")} {...stagger}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white shadow-lg">Most Popular</span>
                )}
                <h3 className="mb-1 text-xl font-bold">{plan.name}</h3>
                <p className="mb-4 text-sm text-silver/70">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{formatPrice(plan.monthly)}</span>
                  {plan.monthly && <span className="ml-1 text-sm text-silver/60">{periodLabel}</span>}
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /><span>{f}</span></li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-silver/40"><X className="mt-0.5 h-4 w-4 shrink-0" /><span className="line-through">{f}</span></li>
                  ))}
                </ul>
                {plan.custom ? (
                  <Link href="/contact">
                    <Button variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary/10">Contact Us <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
                ) : (
                  <Button className="w-full gap-2 bg-primary text-white hover:bg-primary-hover">Get Started <ArrowRight className="h-4 w-4" /></Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="container-site max-w-5xl">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Comparison</span>
            <h2 className="text-section">Feature Comparison</h2>
          </motion.div>
          <motion.div className="overflow-x-auto" {...fadeInUp}>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pr-6 font-semibold">Feature</th>
                  <th className="py-4 px-4 text-center font-semibold">Starter</th>
                  <th className="py-4 px-4 text-center font-semibold text-accent">Business</th>
                  <th className="py-4 px-4 text-center font-semibold">Premium</th>
                  <th className="py-4 pl-4 text-center font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/10">
                    <td className="py-4 pr-6 font-medium">{row.feature}</td>
                    {(["starter", "business", "premium", "enterprise"] as const).map((key) => (
                      <td key={key} className="py-4 px-4 text-center">
                        {row[key] === true ? <Check className="mx-auto h-4 w-4 text-success" />
                          : row[key] === false ? <X className="mx-auto h-4 w-4 text-destructive" />
                          : <span className="text-xs font-medium text-silver/60">{row[key] as string}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site max-w-3xl">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <HelpCircle className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="text-section">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card !rounded-xl overflow-hidden border-0 [&[data-state=open]]:border [&[data-state=open]]:border-primary/30">
                  <AccordionTrigger className="text-left px-6 py-4 hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-silver px-6 pb-4">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <motion.div className="relative container-site max-w-xl text-center" {...fadeInUp}>
          <h2 className="text-subsection mb-4">Still Have Questions?</h2>
          <p className="mb-8 text-lg text-silver">Our team is ready to help you find the perfect plan for your business.</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">Contact Sales <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
