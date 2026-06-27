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

const tabs = ["General", "Services", "Pricing", "Support"]

const faqs: Record<string, { q: string; a: string }[]> = {
  General: [
    { q: "What is NSH Media?", a: "NSH Media is a full-service digital agency specializing in web design, development, SEO, AI automation, branding, and e-commerce solutions. We help businesses build and grow their digital presence." },
    { q: "Where are you located?", a: "Our headquarters is in New York City, but we work with clients around the world through our distributed team." },
    { q: "What industries do you serve?", a: "We work across a wide range of industries including technology, healthcare, retail, finance, education, and professional services." },
    { q: "How long does a typical project take?", a: "Project timelines vary depending on scope. A standard website takes 4-8 weeks, while complex e-commerce or AI projects may take 12-16 weeks." },
    { q: "Do you work with startups?", a: "Absolutely. We love working with startups and offer scalable solutions that grow with your business." },
  ],
  Services: [
    { q: "What services do you offer?", a: "We offer web design, web development, SEO, AI automation, branding, e-commerce development, and ongoing maintenance services." },
    { q: "Do you offer post-launch support?", a: "Yes, all our plans include post-launch support. The duration and scope depend on your chosen plan." },
    { q: "Can you redesign an existing website?", a: "Yes, we frequently redesign and modernize existing websites. We audit your current site and develop a comprehensive improvement plan." },
    { q: "Do you provide content writing?", a: "We partner with professional copywriters and can include content creation as part of your project scope." },
    { q: "What technology stack do you use?", a: "We primarily use Next.js, React, Tailwind CSS, Node.js, and various cloud platforms. We select the best technology for each project's needs." },
  ],
  Pricing: [
    { q: "How much does a website cost?", a: "Our pricing starts at $499/month for the Starter plan and goes up to custom Enterprise pricing. Each plan is designed to deliver exceptional value." },
    { q: "Is there a contract term?", a: "We offer both monthly and annual billing. Annual plans come with a 20% discount. There are no long-term lock-in contracts beyond your billing period." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and wire transfers for enterprise clients." },
    { q: "Do you offer refunds?", a: "Yes, we provide a 14-day money-back guarantee on all plans. Please refer to our refund policy for full details." },
    { q: "Are there any hidden fees?", a: "No hidden fees. Our pricing is transparent and includes everything outlined in your plan." },
  ],
  Support: [
    { q: "How do I get technical support?", a: "You can reach our support team via email, live chat, or phone depending on your plan. Enterprise clients get 24/7 priority support." },
    { q: "What are your support hours?", a: "Standard support is available Monday through Friday, 9 AM to 6 PM EST. Premium and Enterprise plans include extended and weekend support." },
    { q: "How quickly do you respond?", a: "Standard plans receive responses within 24 hours. Premium within 4 hours, and Enterprise within 1 hour." },
    { q: "Can you help with third-party integrations?", a: "Yes, our team can help integrate your site with CRMs, marketing tools, analytics platforms, and other third-party services." },
    { q: "Do you offer emergency support?", a: "Enterprise plans include emergency support with guaranteed response times. We can also arrange emergency support on other plans." },
  ],
}

export default function FAQPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("General")

  const currentFaqs = faqs[activeTab] || []
  const filtered = search
    ? currentFaqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
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
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-silver">
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
                    <AccordionTrigger className="text-left font-medium px-6 py-4 hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-silver px-6 pb-4">{faq.a}</AccordionContent>
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
