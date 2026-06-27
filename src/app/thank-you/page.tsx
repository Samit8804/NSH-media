import type { Metadata } from "next"
import ThankYouPage from "./PageClient"

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting NSH Media. We'll get back to you within 24 hours.",
  openGraph: {
    title: "Thank You | NSH Media",
    description: "Thank you for contacting NSH Media. We'll get back to you within 24 hours.",
    url: "https://nshmedia.com/thank-you",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You | NSH Media",
    description: "Thank you for contacting NSH Media. We'll get back to you within 24 hours.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/thank-you",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <ThankYouPage />
}
