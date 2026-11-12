import type { Metadata } from "next"
import { RefreshCw } from "lucide-react"
import { pageMetadata } from "@/lib/metadata"
import { CONTACT_EMAIL } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Refund Policy",
  description:
    "The refund and cancellation policy for website design, web development, and e-commerce services provided by NSH Media Services.",
  path: "/refund-policy",
})

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-3xl text-center">
          <RefreshCw className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="text-hero mb-6">Refund Policy</h1>
          <p className="text-lg text-silver">Last updated: November 12, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {[
            { title: "1. Overview", content: "At NSH Media Services, we are committed to delivering clear, agreed project outcomes. This Refund Policy outlines the terms and conditions under which refunds are issued." },
            { title: "2. Project Agreements", content: "Refund terms for each engagement are set out in the service agreement agreed before work begins. Please review that agreement for the terms that apply to your project." },
            { title: "3. Refund Eligibility", content: "Eligibility depends on the terms of your service agreement and the stage of work completed. If you believe a refund is warranted, contact us so we can review the request in good faith." },
            { title: "4. How to Request a Refund", content: `To request a refund, please contact us at ${CONTACT_EMAIL} with the subject line &quot;Refund Request.&quot; Include your project or account details and the reason for your request. We will review it and reply by email.` },
            { title: "5. Refund Processing", content: "Approved refunds are returned to the original payment method. The time it takes to appear depends on the payment provider and your financial institution." },
            { title: "6. Exceptions", content: "Custom project fees and third-party costs are governed by the service agreement. Refunds for these items are evaluated on a case-by-case basis." },
            { title: "7. Partial Refunds", content: "Where part of the work has been delivered, any refund is agreed based on the work completed and the terms of the service agreement." },
            { title: "8. Payment Disputes", content: "If you believe a payment is incorrect, contact us first so we can review it. Any formal chargeback is handled through the applicable payment provider's process." },
            { title: "9. Changes to This Policy", content: "We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. We encourage you to review this policy periodically." },
            { title: "10. Contact", content: `If you have any questions about this Refund Policy, please contact us at ${CONTACT_EMAIL}.` },
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
