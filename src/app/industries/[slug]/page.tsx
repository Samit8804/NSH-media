import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { INDUSTRIES } from "@/data/industries"
import { Button } from "@/components/ui/button"

interface IndustryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  if (!industry) return {}
  return {
    title: `${industry.name} | NSH Media`,
    description: industry.description,
  }
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)

  if (!industry) notFound()

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Industries</p>
          <h1 className="text-hero text-gradient font-heading">{industry.name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-silver">{industry.tagline}</p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-heading font-semibold text-white">About {industry.name}</h2>
            <p className="mt-4 leading-relaxed text-silver">{industry.description}</p>

            <h2 className="mt-12 text-2xl font-heading font-semibold text-white">Services we offer</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {industry.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-silver"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="container-site flex flex-col items-center justify-between gap-6 text-center">
          <h2 className="text-2xl font-heading font-semibold text-white">Have a project in {industry.name}?</h2>
          <p className="max-w-2xl text-silver">Tell us about your goals and we&apos;ll show you how we can help.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
