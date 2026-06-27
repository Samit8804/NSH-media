import type { Metadata } from "next"
import PortfolioPage from "./PageClient"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse our portfolio of successful web development, design, and branding projects. See how we drive growth for our clients.",
  openGraph: {
    title: "Portfolio | NSH Media",
    description: "Browse our portfolio of successful web development, design, and branding projects. See how we drive growth for our clients.",
    url: "https://nshmedia.com/portfolio",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | NSH Media",
    description: "Browse our portfolio of successful web development, design, and branding projects. See how we drive growth for our clients.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <PortfolioPage />
}
