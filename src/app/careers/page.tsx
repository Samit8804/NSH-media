import type { Metadata } from "next"
import CareersPage from "./PageClient"

export const metadata: Metadata = {
  title: "Careers",
  description: "Join NSH Media and help build the future of digital experiences. View open positions and apply today.",
  openGraph: {
    title: "Careers | NSH Media",
    description: "Join NSH Media and help build the future of digital experiences. View open positions and apply today.",
    url: "https://nshmedia.com/careers",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | NSH Media",
    description: "Join NSH Media and help build the future of digital experiences. View open positions and apply today.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/careers",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <CareersPage />
}
