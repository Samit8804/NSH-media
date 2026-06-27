import type { Metadata } from "next"
import ContactPage from "./PageClient"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with NSH Media. Start your digital transformation journey with a free consultation.",
  openGraph: {
    title: "Contact Us | NSH Media",
    description: "Get in touch with NSH Media. Start your digital transformation journey with a free consultation.",
    url: "https://nshmedia.com/contact",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | NSH Media",
    description: "Get in touch with NSH Media. Start your digital transformation journey with a free consultation.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <ContactPage />
}
