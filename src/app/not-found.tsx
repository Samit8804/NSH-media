import type { Metadata } from "next"
import NotFoundPage from "./not-found-client"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist. Return to NSH Media's homepage.",
  openGraph: {
    title: "404 - Page Not Found | NSH Media",
    description: "The page you're looking for doesn't exist. Return to NSH Media's homepage.",
    url: "https://nshmedia.com/404",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "404 - Page Not Found | NSH Media",
    description: "The page you're looking for doesn't exist. Return to NSH Media's homepage.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/404",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <NotFoundPage />
}
