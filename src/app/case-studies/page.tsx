import type { Metadata } from "next"
import CaseStudiesPage from "./PageClient"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "In-depth case studies showcasing our digital solutions and measurable results for clients across industries.",
  openGraph: {
    title: "Case Studies | NSH Media",
    description: "In-depth case studies showcasing our digital solutions and measurable results for clients across industries.",
    url: "https://nshmedia.com/case-studies",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | NSH Media",
    description: "In-depth case studies showcasing our digital solutions and measurable results for clients across industries.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/case-studies",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <CaseStudiesPage />
}
