import type { Metadata } from "next"
import PricingPage from "./PageClient"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing plans for web development, design, SEO, and digital marketing services. Find the perfect plan for your business.",
  openGraph: {
    title: "Pricing | NSH Media",
    description: "Transparent pricing plans for web development, design, SEO, and digital marketing services. Find the perfect plan for your business.",
    url: "https://nshmedia.com/pricing",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | NSH Media",
    description: "Transparent pricing plans for web development, design, SEO, and digital marketing services. Find the perfect plan for your business.",
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

export default function Page() {
  return <PricingPage />
}
