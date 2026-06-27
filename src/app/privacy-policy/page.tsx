import type { Metadata } from "next"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "NSH Media's privacy policy explaining how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | NSH Media",
    description: "NSH Media's privacy policy explaining how we collect, use, and protect your personal information.",
    url: "https://nshmedia.com/privacy-policy",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | NSH Media",
    description: "NSH Media's privacy policy explaining how we collect, use, and protect your personal information.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Shield className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="text-hero mb-6">Privacy Policy</h1>
          <p className="text-lg text-silver">Last updated: June 1, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {[
            { title: "1. Introduction", content: "NSH Media (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services." },
            { title: "2. Information We Collect", content: "We may collect personal information that you voluntarily provide to us when you fill out a contact form, subscribe to our newsletter, or engage with our services. This may include your name, email address, phone number, company name, and project details. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and browsing behavior through cookies and similar tracking technologies." },
            { title: "3. How We Use Your Information", content: "We use the collected information to provide and improve our services, communicate with you, process transactions, send marketing communications (with your consent), and comply with legal obligations." },
            { title: "4. Data Sharing and Disclosure", content: "We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our website and conducting our business, subject to strict confidentiality agreements." },
            { title: "5. Data Security", content: "We implement industry-standard security measures including SSL encryption, firewalls, and secure server infrastructure to protect your personal information from unauthorized access, alteration, or disclosure." },
            { title: "6. Your Rights", content: "You have the right to access, correct, update, or delete your personal information at any time. You may also opt out of marketing communications by contacting us or using the unsubscribe link in our emails." },
            { title: "7. Cookies", content: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings." },
            { title: "8. Third-Party Links", content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information." },
            { title: "9. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date." },
            { title: "10. Contact Us", content: "If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@nshmedia.com or write to us at 123 Madison Avenue, Suite 400, New York, NY 10016." },
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
