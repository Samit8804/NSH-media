import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash("nshmedia12345", 12)

  const admin = await prisma.user.upsert({
    where: { email: "nshmediaservice@gmail.com" },
    update: {},
    create: {
      name: "Admin",
      email: "nshmediaservice@gmail.com",
      password: adminPassword,
      role: "SUPER_ADMIN",
    },
  })

  const editor = await prisma.user.upsert({
    where: { email: "editor@nshmedia.com" },
    update: {},
    create: {
      name: "Editor",
      email: "editor@nshmedia.com",
      password: adminPassword,
      role: "EDITOR",
    },
  })

  const services = [
    {
      title: "Web Design",
      slug: "web-design",
      description: "Beautiful, user-centric designs that captivate your audience and drive engagement.",
      icon: "Palette",
      benefits: ["Modern UI/UX", "Mobile-first design", "Conversion optimized", "Brand aligned"],
      features: ["Custom UI/UX Design", "Wireframing & Prototyping", "Responsive Design", "Design Systems", "User Research", "A/B Testing"],
      process: [{ title: "Discovery", description: "Understanding your brand and goals" }, { title: "Research", description: "Analyzing your audience and competitors" }, { title: "Wireframe", description: "Structuring the user journey" }, { title: "Design", description: "Creating pixel-perfect mockups" }, { title: "Handoff", description: "Delivering ready-to-build designs" }],
      faqs: [{ question: "How long does a web design project take?", answer: "Typically 2-4 weeks depending on complexity." }, { question: "Do you include responsive design?", answer: "Yes, all our designs are mobile-first and fully responsive." }],
      published: true,
    },
    {
      title: "Web Development",
      slug: "web-development",
      description: "High-performance web applications built with cutting-edge technology.",
      icon: "Code",
      benefits: ["Fast performance", "Scalable architecture", "SEO optimized", "Secure by default"],
      features: ["Next.js Development", "React Applications", "API Development", "Database Design", "Cloud Deployment", "Performance Optimization"],
      process: [{ title: "Planning", description: "Architecture and technology decisions" }, { title: "Setup", description: "Project scaffolding and configuration" }, { title: "Development", description: "Building features iteratively" }, { title: "Testing", description: "Comprehensive quality assurance" }, { title: "Deploy", description: "Production deployment and monitoring" }],
      faqs: [{ question: "What technologies do you use?", answer: "We specialize in Next.js, React, TypeScript, Node.js, and PostgreSQL." }, { question: "Do you provide post-launch support?", answer: "Yes, we offer maintenance packages for ongoing support." }],
      published: true,
    },
    {
      title: "E-Commerce",
      slug: "ecommerce",
      description: "Revenue-driven online stores with seamless shopping experiences.",
      icon: "ShoppingCart",
      benefits: ["Increased sales", "Better conversion", "Mobile optimized", "Secure checkout"],
      features: ["Custom Storefront", "Payment Integration", "Inventory Management", "Order Processing", "Shopping Cart", "Analytics Dashboard"],
      process: [{ title: "Strategy", description: "E-commerce planning and product structuring" }, { title: "Design", description: "Storefront and user experience design" }, { title: "Build", description: "Development and integration" }, { title: "Test", description: "Payment flow and QA testing" }, { title: "Launch", description: "Go-live and monitoring" }],
      faqs: [{ question: "Which e-commerce platform do you use?", answer: "We build custom solutions and also work with Shopify and WooCommerce." }, { question: "Do you handle payment integration?", answer: "Yes, we integrate Stripe, PayPal, and other major payment providers." }],
      published: true,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
  }

  const pricingPlans = [
    { name: "Starter", slug: "starter", price: 499, description: "Perfect for small businesses getting started online", features: ["5 Pages Website", "Responsive Design", "Basic SEO Setup", "Contact Form", "Social Media Integration", "1 Month Support"], popular: false, published: true },
    { name: "Business", slug: "business", price: 1499, description: "Ideal for growing businesses needing a stronger presence", features: ["10 Pages Website", "Custom Design", "Advanced SEO", "CMS Integration", "Blog Setup", "Analytics Setup", "3 Months Support"], popular: true, published: true },
    { name: "Premium", slug: "premium", price: 3999, description: "For businesses demanding enterprise-grade solutions", features: ["Unlimited Pages", "Custom Web Application", "E-Commerce Ready", "Premium SEO Package", "API Integrations", "Priority Support", "6 Months Support"], popular: false, published: true },
    { name: "Enterprise", slug: "enterprise", price: 0, description: "Tailored solutions for large organizations", features: ["Custom Scope", "Dedicated Team", "Full Stack Development", "DevOps & Infrastructure", "24/7 Support", "SLA Guaranteed", "Custom Integrations"], highlighted: true, popular: false, published: true },
  ]

  for (const plan of pricingPlans) {
    await prisma.pricing.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    })
  }

  const faqs = [
    { question: "What is the typical timeline for a website project?", answer: "Most projects take 4-8 weeks from kickoff to launch, depending on complexity and scope.", category: "General", order: 1, published: true },
    { question: "Do you offer ongoing maintenance?", answer: "Yes, we offer monthly maintenance packages that include updates, backups, security patches, and content changes.", category: "Services", order: 2, published: true },
    { question: "What technologies do you specialize in?", answer: "We specialize in Next.js, React, TypeScript, Node.js, PostgreSQL, and cloud platforms like AWS and Vercel.", category: "General", order: 3, published: true },
    { question: "How much does a website cost?", answer: "Our projects start at $499 for simple sites and go up to $10,000+ for complex web applications.", category: "Pricing", order: 4, published: true },
    { question: "Do you provide SEO services?", answer: "Yes, we offer comprehensive SEO packages including technical SEO, on-page optimization, and content strategy.", category: "Services", order: 5, published: true },
    { question: "Can you redesign my existing website?", answer: "Absolutely! We can audit your current site and create a modern redesign that improves performance and user experience.", category: "Services", order: 6, published: true },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq })
  }

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: { siteName: "NSH Media", siteDescription: "Building Digital Experiences That Drive Growth" },
    create: { id: "default", siteName: "NSH Media", siteDescription: "Building Digital Experiences That Drive Growth" },
  })

  console.log("Seed completed successfully")
  console.log(`Admin: nshmediaservice@gmail.com / nshmedia12345`)
  console.log(`Editor: editor@nshmedia.com / admin123`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
