import type { Metadata } from "next"
import { getPricingPlans } from "@/actions/pricing"
import PricingPage from "./PageClient"
import JsonLdScript from "@/components/seo/JsonLdScript"
import {
  breadcrumbSchema,
  offerCatalogSchema,
  webPageSchema,
} from "@/lib/seo"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Website Design & Development Pricing",
  description:
    "View NSH Media Services website packages and starting prices for business websites, custom development, and e-commerce projects.",
  path: "/pricing",
  keywords: [
    "website design pricing",
    "web development cost",
    "e-commerce website pricing",
    "business website packages",
  ],
})

export const dynamic = "force-dynamic"

export default async function Page() {
  const plans = await getPricingPlans()
  const jsonPlans = (plans || []).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    description: p.description,
    features: p.features ?? [],
    highlighted: p.highlighted,
    popular: p.popular,
  }))

  const description =
    "NSH Media Services website packages and starting prices for business websites, custom development, and e-commerce projects."
  const structuredData = [
    webPageSchema({
      title: "Website Design & Development Pricing",
      description,
      path: "/pricing",
    }),
    offerCatalogSchema(
      jsonPlans.map((plan) => ({
        name: plan.name,
        description: plan.description || plan.name,
        price: plan.price,
        slug: plan.slug,
      })),
    ),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Pricing", url: "/pricing" },
    ]),
  ]

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <PricingPage plans={jsonPlans} />
    </>
  )
}
