"use client"

import { motion } from "framer-motion"
import { Palette, Code2, ShoppingCart, Search, Fingerprint, Brain, Check, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SERVICES_DATA } from "@/data/services"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Code2, ShoppingCart, Search, Fingerprint, Brain,
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, staggerChildren: 0.1 },
}

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const service = SERVICES_DATA.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-bg px-6">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-white/10">404</h1>
          <p className="mt-4 text-xl text-silver">Service not found</p>
          <p className="mt-2 text-silver/60">The service you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/services">
            <Button className="mt-8 gap-2 bg-primary text-white hover:bg-primary-hover">
              <ArrowLeft className="h-4 w-4" /> Back to Services
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = iconMap[service.icon]

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] bg-primary/10 text-primary">
              {IconComponent && <IconComponent className="h-10 w-10" />}
            </div>
            <h1 className="text-hero"><span className="text-gradient">{service.title}</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">{service.longDescription}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Benefits</span>
              <h2 className="text-subsection mb-8">Why Choose This Service?</h2>
              <div className="grid gap-6">
                {service.benefits.map((benefit, i) => (
                  <motion.div key={i} className="glass-card flex items-start gap-4 p-5" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-silver">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeInUp}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Features</span>
              <h2 className="text-subsection mb-8">What&apos;s Included</h2>
              <div className="grid gap-4">
                {service.features.map((feature, i) => (
                  <motion.div key={i} className="flex items-center gap-3" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10">
                      <Check className="h-4 w-4 text-success" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="container-site max-w-4xl">
          <motion.div className="mb-16 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Process</span>
            <h2 className="text-subsection">How We Work</h2>
            <p className="mt-4 text-silver">Our proven methodology ensures exceptional results every time.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[31px] top-0 h-full w-0.5 bg-primary/20" />
            <div className="space-y-12">
              {service.process.map((step, i) => (
                <motion.div key={step.title} className="relative flex items-start gap-8" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.15 }}>
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-dark-bg text-lg font-bold text-primary">{i + 1}</div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-silver">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site max-w-3xl">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
            <h2 className="text-subsection">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card !rounded-xl overflow-hidden border-0 [&[data-state=open]]:border [&[data-state=open]]:border-primary/30">
                  <AccordionTrigger className="text-left text-base font-medium px-6 py-4 hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-silver px-6 pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <motion.div className="relative container-site text-center" {...fadeInUp}>
          <h2 className="text-subsection mb-4">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-silver">Let&apos;s discuss how our {service.title} service can transform your business.</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="container-site">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="text-subsection">Explore More</h2>
            <p className="mt-3 text-silver">Discover related projects and articles</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/portfolio?service=${service.slug}`}>
                <Button variant="outline" className="gap-2 border-white/10 text-white hover:bg-white/10">
                  Related Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/blog?tag=${service.title}`}>
                <Button variant="outline" className="gap-2 border-white/10 text-white hover:bg-white/10">
                  Related Articles <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
