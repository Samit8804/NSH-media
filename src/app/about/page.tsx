import type { Metadata } from "next"
import AboutPage from "./PageClient"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about NSH Media's mission, team, and expertise in delivering cutting-edge digital solutions for modern businesses.",
  openGraph: {
    title: "About Us | NSH Media",
    description: "Learn about NSH Media's mission, team, and expertise in delivering cutting-edge digital solutions for modern businesses.",
    url: "https://nshmedia.com/about",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | NSH Media",
    description: "Learn about NSH Media's mission, team, and expertise in delivering cutting-edge digital solutions for modern businesses.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <AboutPage />
}
