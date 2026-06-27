import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import Script from "next/script"
import "@/styles/globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import AuthProvider from "@/providers/session-provider"
import { ToastProvider } from "@/providers/toast-provider"
import LayoutWrapper from "@/components/layout/layout-wrapper"
import CursorFollower from "@/components/effects/cursor-follower"
import SchemaOrg from "@/components/seo/SchemaOrg"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nshmedia.com"),
  title: {
    default: "NSH Media — Building Digital Experiences That Drive Growth",
    template: "%s | NSH Media",
  },
  description:
    "We craft digital experiences that drive growth. From web development to AI automation, we help businesses thrive in the digital landscape.",
  keywords: [
    "web design",
    "web development",
    "e-commerce",
    "SEO",
    "branding",
    "AI automation",
    "digital agency",
  ],
  authors: [{ name: "NSH Media" }],
  creator: "NSH Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nshmedia.com",
    siteName: "NSH Media",
    title: "NSH Media — Building Digital Experiences That Drive Growth",
    description:
      "We craft digital experiences that drive growth. From web development to AI automation, we help businesses thrive in the digital landscape.",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSH Media — Building Digital Experiences That Drive Growth",
    description:
      "We craft digital experiences that drive growth. From web development to AI automation, we help businesses thrive in the digital landscape.",
    images: ["/og-default.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-icon.svg",
  },
  manifest: "/manifest",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
    yandex: "",
    yahoo: "",
  },
  other: {
    "theme-color": "#020617",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen font-sans text-foreground antialiased"
        style={{
          background: "linear-gradient(to bottom, rgba(2,6,23,0.55), rgba(2,6,23,0.7)), url(/images/bg-hero.png) center/cover fixed",
        }}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
          Skip to main content
        </a>
        <SchemaOrg />
        <CursorFollower />
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <LayoutWrapper><main id="main-content">{children}</main></LayoutWrapper>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
          </Script>
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="lazyOnload">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', '${process.env.NEXT_PUBLIC_CLARITY_ID}');`}
          </Script>
        )}
      </body>
    </html>
  )
}
