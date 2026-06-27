import type { Metadata } from "next"
import ServicesPage from "./PageClient"

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive digital services including web development, UI/UX design, SEO, branding, social media management, and AI automation.",
  openGraph: {
    title: "Services | NSH Media",
    description: "Comprehensive digital services including web development, UI/UX design, SEO, branding, social media management, and AI automation.",
    url: "https://nshmedia.com/services",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | NSH Media",
    description: "Comprehensive digital services including web development, UI/UX design, SEO, branding, social media management, and AI automation.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/services",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <ServicesPage />
}
