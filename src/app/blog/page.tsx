import type { Metadata } from "next"
import BlogPage from "./PageClient"

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore insights, tutorials, and industry updates on web development, design, SEO, AI, and digital marketing from the NSH Media team.",
  openGraph: {
    title: "Blog | NSH Media",
    description: "Explore insights, tutorials, and industry updates on web development, design, SEO, AI, and digital marketing from the NSH Media team.",
    url: "https://nshmedia.com/blog",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | NSH Media",
    description: "Explore insights, tutorials, and industry updates on web development, design, SEO, AI, and digital marketing from the NSH Media team.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <BlogPage />
}
