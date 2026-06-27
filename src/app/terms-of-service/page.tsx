import type { Metadata } from "next"
import { Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of NSH Media's website and services.",
  openGraph: {
    title: "Terms of Service | NSH Media",
    description: "Terms and conditions governing the use of NSH Media's website and services.",
    url: "https://nshmedia.com/terms-of-service",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | NSH Media",
    description: "Terms and conditions governing the use of NSH Media's website and services.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Scale className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="text-hero mb-6">Terms of Service</h1>
          <p className="text-lg text-silver">Last updated: June 1, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {[
            { title: "1. Acceptance of Terms", content: "By accessing or using the NSH Media website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services." },
            { title: "2. Services Description", content: "NSH Media provides digital agency services including web design, web development, SEO, AI automation, branding, and e-commerce solutions. The specific scope of work, deliverables, and timelines will be outlined in individual service agreements." },
            { title: "3. Client Responsibilities", content: "Clients agree to provide timely feedback, necessary materials, and access to required systems. Delays caused by the client may affect project timelines and are not the responsibility of NSH Media." },
            { title: "4. Intellectual Property", content: "Upon full payment, clients retain ownership of the final deliverables. NSH Media retains the right to display completed work in our portfolio unless otherwise agreed in writing. All pre-existing intellectual property remains the property of the respective owner." },
            { title: "5. Payment Terms", content: "Payment terms are specified in each service agreement. Late payments may result in service suspension. All fees are non-refundable except as expressly stated in our Refund Policy." },
            { title: "6. Confidentiality", content: "Both parties agree to maintain the confidentiality of proprietary information shared during the course of the engagement. This obligation survives the termination of the agreement." },
            { title: "7. Limitation of Liability", content: "NSH Media shall not be liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid by the client for the specific service giving rise to the claim." },
            { title: "8. Termination", content: "Either party may terminate an agreement with written notice as specified in the service agreement. Upon termination, the client is responsible for payment for work completed up to the termination date." },
            { title: "9. Governing Law", content: "These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions." },
            { title: "10. Changes to Terms", content: "We reserve the right to modify these terms at any time. Clients will be notified of material changes via email or through our website. Continued use of our services after changes constitutes acceptance of the new terms." },
            { title: "11. Contact", content: "For questions about these Terms of Service, please contact us at legal@nshmedia.com." },
          ].map((section) => (
            <div key={section.title} className="glass-card p-8">
              <h2 className="text-subsection mb-4">{section.title}</h2>
              <p className="text-silver leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
