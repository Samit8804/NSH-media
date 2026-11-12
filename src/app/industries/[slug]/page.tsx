import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { INDUSTRIES, INDUSTRY_SERVICE_SLUGS } from "@/data/industries"
import { Button } from "@/components/ui/button"
import JsonLdScript from "@/components/seo/JsonLdScript"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo"
import { ogImage, pageMetadata } from "@/lib/metadata"

interface IndustryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  if (!industry) return {}

  return pageMetadata({
    title: `${industry.name} Website Design & Development`,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
    image: ogImage(
      `${industry.name} Website Design & Development`,
      "NSH Media Services",
    ),
    keywords: [
      `${industry.name.toLowerCase()} website design`,
      `${industry.name.toLowerCase()} web development`,
      `website design for ${industry.name.toLowerCase()} businesses`,
    ],
  })
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)

  if (!industry) notFound()

  const relatedIndustries = INDUSTRIES.filter(
    (item) => item.slug !== industry.slug,
  ).slice(0, 4)

  const structuredData = [
    webPageSchema({
      title: `${industry.name} Website Design & Development`,
      description: industry.metaDescription,
      path: `/industries/${industry.slug}`,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: industry.name, url: `/industries/${industry.slug}` },
    ]),
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <JsonLdScript schema={structuredData} />

      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-xs text-silver/70">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-silver/30">
                /
              </li>
              <li aria-current="page" className="text-silver">
                {industry.name}
              </li>
            </ol>
          </nav>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Industries
          </p>
          <h1 className="text-hero text-gradient font-heading">
            {industry.name} Website Design & Development
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-silver">
            {industry.tagline}
          </p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-heading font-semibold text-white">
              How our services apply to {industry.name.toLowerCase()}
            </h2>
            <p className="mt-4 leading-relaxed text-silver">
              {industry.description}
            </p>

            <h2 className="mt-12 text-2xl font-heading font-semibold text-white">
              Services we offer
            </h2>
            <p className="mt-3 leading-relaxed text-silver">
              We apply the same three core services to every sector. The scope,
              content, and technical requirements change based on your
              organisation and audience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {industry.services.map((service) => {
                const serviceSlug = INDUSTRY_SERVICE_SLUGS[service]
                return serviceSlug ? (
                  <Link
                    key={service}
                    href={`/services/${serviceSlug}`}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-silver transition-colors hover:border-primary/40 hover:text-white"
                  >
                    {service}
                  </Link>
                ) : (
                  <span
                    key={service}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-silver"
                  >
                    {service}
                  </span>
                )
              })}
            </div>

            <h2 className="mt-12 text-2xl font-heading font-semibold text-white">
              Our project approach
            </h2>
            <ol className="mt-6 space-y-4">
              {[
                "Understand the organisation, audience, and the actions visitors need to take.",
                "Map the site structure and content before visual design begins.",
                "Design responsive page templates and reusable components.",
                "Build, test, and launch with performance, accessibility, and technical SEO in mind.",
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-4 text-silver">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="pt-1 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-10 leading-relaxed text-silver">
              You can see the services in more detail on the{" "}
              <Link
                href="/services"
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                services page
              </Link>
              , or read about{" "}
              <Link
                href="/about"
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                how we work
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="container-site">
          <div className="flex flex-col items-center justify-between gap-6 text-center">
            <h2 className="text-2xl font-heading font-semibold text-white">
              Have a {industry.name.toLowerCase()} project?
            </h2>
            <p className="max-w-2xl text-silver">
              Tell us about your goals and we&apos;ll show you how we can help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="container-site">
          <h2 className="mb-6 text-center text-2xl font-heading font-semibold text-white">
            Other industries
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedIndustries.map((item) => (
              <Link
                key={item.slug}
                href={`/industries/${item.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-silver transition-colors hover:border-primary/40 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
