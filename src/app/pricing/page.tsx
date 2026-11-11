import type { Metadata } from "next"
import { getPricingPlans } from "@/actions/pricing"
import PricingPage from "./PageClient"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for our digital services. Choose the plan that fits your needs and scale as you grow.",
  openGraph: {
    title: "Pricing | NSH Media",
    description: "Simple, transparent pricing for our digital services. Choose the plan that fits your needs and scale as you grow.",
    url: "https://nshmedia.com/pricing",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | NSH Media",
    description: "Simple, transparent pricing for our digital services. Choose the plan that fits your needs and scale as you grow.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/pricing",
  },
  robots: {
    index: true,
    follow: true,
  },
}

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

  return <PricingPage plans={jsonPlans} />
}
