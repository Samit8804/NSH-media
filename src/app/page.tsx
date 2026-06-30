import type { Metadata } from "next"
import HomePage from "./PageClient"

export const metadata: Metadata = {
  title: "NSH Media - Building Digital Experiences That Drive Growth",
  description: "NSH Media is a premium digital agency delivering web development, UI/UX design, SEO optimization, branding, and AI automation services that drive growth.",
  keywords: ["web development", "UI/UX design", "SEO", "branding", "AI automation", "digital agency"],
  openGraph: {
    title: "NSH Media - Building Digital Experiences That Drive Growth",
    description: "NSH Media is a premium digital agency delivering web development, UI/UX design, SEO optimization, branding, and AI automation services that drive growth.",
    url: "https://nshmedia.com",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSH Media - Building Digital Experiences That Drive Growth",
    description: "NSH Media is a premium digital agency delivering web development, UI/UX design, SEO optimization, branding, and AI automation services that drive growth.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <HomePage />
}
