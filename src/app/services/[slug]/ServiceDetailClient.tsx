"use client"

import { motion } from "framer-motion"
import {
  Palette,
  Code2,
  ShoppingCart,
  Search,
  Fingerprint,
  Brain,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Code2,
  ShoppingCart,
  Search,
  Fingerprint,
  Brain,
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
}

interface ProcessStep {
  title: string
  description: string
}

interface Faq {
  question: string
  answer: string
}

export interface ServiceDetail {
  id?: string
  title: string
  slug: string
  description: string
  icon: string
  benefits?: string[]
  features?: string[]
  process?: ProcessStep[]
  faqs?: Faq[]
}

interface RelatedService {
  title: string
  slug: string
  description: string
}

interface ServiceDetailClientProps {
  service: ServiceDetail | null
  relatedServices?: RelatedService[]
}

/**
 * Direct, self-contained answers for answer engines. These descriptions are
 * intentionally factual and describe the service rather than making claims
 * about company size, awards, or results.
 */
const SERVICE_CONTENT: Record<
  string,
  { answer: string; audience: string[]; problems: string[] }
> = {
  "web-design": {
    answer:
      "Web design is the process of planning a website's structure, pages, and visual system before it is built. NSH Media Services designs responsive, user-focused websites: we start with discovery and wireframes, then create high-fidelity page designs and a reusable design system that developers can build from.",
    audience: [
      "Businesses launching a new website",
      "Companies redesigning an outdated site",
      "Teams that need a clear, reusable design system",
    ],
    problems: [
      "Visitors cannot find what they need",
      "The site feels dated or inconsistent on mobile",
      "Pages are hard to update without breaking the layout",
      "Enquiries are low because the journey is unclear",
    ],
  },
  "web-development": {
    answer:
      "Web development is the technical work of turning a design into a fast, secure, working website or web application. NSH Media Services builds with modern frameworks, clean and maintainable code, and attention to performance, accessibility, and technical SEO foundations.",
    audience: [
      "Businesses that need a custom marketing site",
      "Companies replacing a slow or hard-to-edit site",
      "Teams that need an API-backed web application",
    ],
    problems: [
      "Slow pages and poor Core Web Vitals",
      "A site that is difficult to maintain or extend",
      "Broken forms, integrations, or checkout flows",
      "Weak technical SEO foundations",
    ],
  },
  ecommerce: {
    answer:
      "E-commerce development is the process of building an online store that lets customers browse products, add items to a cart, and pay securely. NSH Media Services designs and builds storefronts, integrates payment and inventory systems, and tests the full purchase flow before launch.",
    audience: [
      "Retailers moving their store online",
      "Brands replatforming an existing store",
      "Businesses adding an online store to an existing site",
    ],
    problems: [
      "High cart abandonment",
      "A checkout that is confusing on mobile",
      "Manual inventory or order handling",
      "No clear view of what is selling",
    ],
  },
}

export default function ServiceDetailClient({
  service,
  relatedServices = [],
}: ServiceDetailClientProps) {
  if (!service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-bg px-6">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-white/10">404</h1>
          <p className="mt-4 text-xl text-silver">Service not found</p>
          <p className="mt-2 text-silver/60">
            The service you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/services">
            <Button className="mt-8 gap-2 bg-primary text-white hover:bg-primary-hover">
              <ArrowLeft className="h-4 w-4" /> Back to Services
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const benefits = service.benefits ?? []
  const features = service.features ?? []
  const process = service.process ?? []
  const faqs = service.faqs ?? []
  const IconComponent = iconMap[service.icon]
  const content = SERVICE_CONTENT[service.slug] ?? {
    answer: `${service.title} is one of the services provided by NSH Media Services. ${service.description}`,
    audience: [
      "Businesses planning a new website",
      "Teams improving an existing digital experience",
      "Organisations that need a clear, maintainable solution",
    ],
    problems: benefits.length ? benefits : ["An unclear or outdated digital presence"],
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <nav aria-label="Breadcrumb" className="mb-10 flex justify-center">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-xs text-silver/70">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-silver/30">
                  /
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors hover:text-white"
                  >
                    Services
                  </Link>
                </li>
                <li aria-hidden="true" className="text-silver/30">
                  /
                </li>
                <li aria-current="page" className="text-silver">
                  {service.title}
                </li>
              </ol>
            </nav>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] bg-primary/10 text-primary">
              {IconComponent && <IconComponent className="h-10 w-10" />}
            </div>
            <h1 className="text-hero">
              <span className="text-gradient">{service.title}</span> Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site max-w-4xl">
          <motion.div {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Direct Answer
            </span>
            <h2 className="text-subsection mb-6">
              What is {service.title.toLowerCase()}?
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-silver">
              {content.answer}
            </p>
          </motion.div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <motion.div {...fadeInUp} className="glass-card p-8">
              <h3 className="mb-5 text-lg font-semibold text-white">
                Who this service is for
              </h3>
              <ul className="space-y-3">
                {content.audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-silver"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeInUp} className="glass-card p-8">
              <h3 className="mb-5 text-lg font-semibold text-white">
                Common problems this solves
              </h3>
              <ul className="space-y-3">
                {content.problems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-silver"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-secondary">
        <div className="container-site">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Benefits
              </span>
              <h2 className="text-subsection mb-8">Why Choose This Service?</h2>
              <div className="grid gap-6">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="glass-card flex items-start gap-4 p-5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-silver">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeInUp}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Deliverables
              </span>
              <h2 className="text-subsection mb-8">What&apos;s Included</h2>
              <div className="grid gap-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
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

      <section className="px-6 py-24">
        <div className="container-site max-w-4xl">
          <motion.div className="mb-16 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Process
            </span>
            <h2 className="text-subsection">How We Work</h2>
            <p className="mt-4 text-silver">
              A clear, step-by-step process keeps scope, feedback, and delivery
              aligned.
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[31px] top-0 h-full w-0.5 bg-primary/20" />
            <div className="space-y-12">
              {process.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="relative flex items-start gap-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-dark-bg text-lg font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-silver">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section-padding px-6 bg-secondary">
          <div className="container-site max-w-3xl">
            <motion.div className="mb-12 text-center" {...fadeInUp}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                FAQ
              </span>
              <h2 className="text-subsection">
                {service.title} Questions
              </h2>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="glass-card !rounded-xl overflow-hidden border-0 [&[data-state=open]]:border [&[data-state=open]]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left text-base font-medium px-6 py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-silver px-6 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
            <p className="mt-8 text-center text-sm text-silver">
              Have another question?{" "}
              <Link
                href="/faq"
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Read all FAQs
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <motion.div {...fadeInUp} className="relative container-site text-center">
          <h2 className="text-subsection mb-4">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-silver">
            Tell us about your project and we will recommend the right {service.title.toLowerCase()} approach.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="gap-2 bg-primary text-white hover:bg-primary-hover"
            >
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {relatedServices.length > 0 && (
        <section className="border-t border-white/10 px-6 py-16">
          <div className="container-site">
            <motion.div {...fadeInUp} className="text-center">
              <h2 className="text-subsection">Explore Other Services</h2>
              <p className="mt-3 text-silver">
                NSH Media Services also offers:
              </p>
              <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="glass-card group p-5 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <h3 className="mb-1 font-semibold text-white group-hover:text-primary">
                      {related.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-silver">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="border-t border-white/10 px-6 py-16">
        <div className="container-site">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="text-subsection">See the Work</h2>
            <p className="mt-3 text-silver">
              Browse our portfolio, read practical insights, or start a
              conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="gap-2 border-white/10 text-white hover:bg-white/10"
                >
                  View Portfolio <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="gap-2 border-white/10 text-white hover:bg-white/10"
                >
                  Read Insights <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="gap-2 border-white/10 text-white hover:bg-white/10"
                >
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
