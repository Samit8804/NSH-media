import type { Metadata } from "next"
import { RefreshCw } from "lucide-react"

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "NSH Media's refund and cancellation policy for digital services and products.",
  openGraph: {
    title: "Refund Policy | NSH Media",
    description: "NSH Media's refund and cancellation policy for digital services and products.",
    url: "https://nshmedia.com/refund-policy",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy | NSH Media",
    description: "NSH Media's refund and cancellation policy for digital services and products.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-3xl text-center">
          <RefreshCw className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="text-hero mb-6">Refund Policy</h1>
          <p className="text-lg text-silver">Last updated: June 1, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {[
            { title: "1. Overview", content: "At NSH Media, we are committed to delivering exceptional value. We offer a 14-day money-back guarantee on all our subscription plans. This Refund Policy outlines the terms and conditions under which refunds are issued." },
            { title: "2. 14-Day Money-Back Guarantee", content: "If you are not satisfied with our services for any reason, you may request a full refund within 14 days of your initial payment. This guarantee applies to all monthly and annual subscription plans." },
            { title: "3. Refund Eligibility", content: "To be eligible for a refund, you must request it within 14 days of the initial payment date. Refund requests made after the 14-day period will not be honored unless otherwise specified in your service agreement." },
            { title: "4. How to Request a Refund", content: "To request a refund, please contact our support team at support@nshmedia.com with the subject line &quot;Refund Request.&quot; Include your account details and the reason for your request. We will process your request within 5-7 business days." },
            { title: "5. Refund Processing", content: "Approved refunds will be issued to the original payment method used for the purchase. Depending on your financial institution, it may take an additional 3-10 business days for the refund to appear in your account." },
            { title: "6. Exceptions", content: "Custom Enterprise plans and one-time project fees are not eligible for the 14-day guarantee unless explicitly stated in the service agreement. Refunds for these services are evaluated on a case-by-case basis." },
            { title: "7. Partial Refunds", content: "In certain circumstances, such as partial service delivery or mid-cycle cancellations, we may offer a prorated refund at our discretion." },
            { title: "8. Chargebacks", content: "If you initiate a chargeback with your bank or credit card company without first contacting us to resolve the issue, your account may be immediately suspended and you may be subject to additional fees." },
            { title: "9. Changes to This Policy", content: "We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. We encourage you to review this policy periodically." },
            { title: "10. Contact", content: "If you have any questions about this Refund Policy, please contact us at support@nshmedia.com or call us at +1 (555) 123-4567." },
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
