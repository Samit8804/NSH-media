import type { Metadata } from "next"
import FAQPage from "./PageClient"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about our digital services, process, pricing, and how we help businesses grow online.",
  openGraph: {
    title: "FAQ | NSH Media",
    description: "Frequently asked questions about our digital services, process, pricing, and how we help businesses grow online.",
    url: "https://nshmedia.com/faq",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | NSH Media",
    description: "Frequently asked questions about our digital services, process, pricing, and how we help businesses grow online.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <FAQPage />
}
