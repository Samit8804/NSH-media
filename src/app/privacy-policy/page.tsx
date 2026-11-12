import type { Metadata } from "next"
import { Shield } from "lucide-react"
import { pageMetadata } from "@/lib/metadata"
import { CONTACT_EMAIL } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How NSH Media Services collects, uses, and protects personal information submitted through this website and project enquiries.",
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Shield className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="text-hero mb-6">Privacy Policy</h1>
          <p className="text-lg text-silver">Last updated: November 12, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {[
            { title: "1. Introduction", content: "NSH Media Services (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services." },
            { title: "2. Information We Collect", content: "We collect personal information that you voluntarily provide when you fill out a contact form or email us. This may include your name, email address, phone number, company name, and project details. Our hosting and analytics providers may also process standard technical information such as your IP address, browser type, referring page, and pages visited." },
            { title: "3. How We Use Your Information", content: "We use the information you provide to respond to enquiries, discuss and deliver projects, maintain business records, and comply with legal obligations. We do not sell your personal information." },
            { title: "4. Data Sharing and Disclosure", content: "We do not sell your personal information. We may share your data with service providers that help us operate this website and conduct our business, and only for the purpose of providing those services." },
            { title: "5. Data Security", content: "This website is served over HTTPS. We limit access to enquiry information to the people who need it to respond and deliver work. No method of transmission or storage is completely secure, so we cannot guarantee absolute security." },
            { title: "6. Your Rights", content: "You can ask us to access, correct, or delete the personal information you have sent us. Contact us using the email address below and we will respond within a reasonable period." },
            { title: "7. Cookies", content: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings." },
            { title: "8. Third-Party Links", content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information." },
            { title: "9. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date." },
            { title: "10. Contact Us", content: `If you have any questions about this Privacy Policy or our data practices, please contact us at ${CONTACT_EMAIL}.` },
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
