"use client"

import { motion } from "framer-motion"
import { Globe, Code, ShoppingCart, Search, Palette, BrainCircuit } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Web Design",
    description: "Stunning, user-centric designs that captivate your audience and elevate your brand identity.",
    fullDescription: "We create visually stunning, conversion-focused designs that reflect your brand identity and captivate your target audience. Every layout, color palette, and typography choice is intentional — designed to guide users toward action. Our UI/UX design process combines aesthetic excellence with data-driven usability principles for maximum impact.",
    icon: Palette,
    slug: "web-design",
  },
  {
    title: "Web Development",
    description: "High-performance websites built with modern technologies for speed, scalability, and reliability.",
    fullDescription: "Our development team builds high-performance websites and web applications using cutting-edge technologies like Next.js, React, Node.js, and TypeScript. We prioritize speed, scalability, and security in every project, ensuring your digital presence performs flawlessly under any load. From custom CMS solutions to complex web applications, we deliver results that exceed expectations.",
    icon: Code,
    slug: "web-development",
  },
  {
    title: "E-Commerce",
    description: "Custom online stores with seamless checkout, inventory management, and exceptional UX.",
    fullDescription: "We build custom e-commerce platforms with seamless checkout experiences, intelligent product management, and integrated payment gateways. Our solutions are designed to maximize conversion rates and streamline inventory management. Whether you need a Shopify store or a fully custom marketplace, we deliver a shopping experience that drives sales.",
    icon: ShoppingCart,
    slug: "e-commerce",
  },
  {
    title: "SEO",
    description: "Data-driven SEO strategies that boost rankings, drive traffic, and increase conversions.",
    fullDescription: "Our data-driven SEO strategies combine technical optimization, quality content creation, and strategic link building to boost your search rankings. We target high-intent keywords and optimize your site structure for maximum organic visibility. The result is sustainable traffic growth and higher conversion rates from qualified leads.",
    icon: Search,
    slug: "seo",
  },
  {
    title: "Branding",
    description: "Complete brand identity packages including logos, typography, and visual guidelines.",
    fullDescription: "We develop complete brand identity systems that communicate your unique value proposition and resonate with your target market. From logo design and typography to brand guidelines and marketing collateral, every element is crafted for consistency and impact. Your brand becomes a powerful asset that builds trust and recognition across every touchpoint.",
    icon: Globe,
    slug: "branding",
  },
  {
    title: "AI Automation",
    description: "Intelligent automation solutions that streamline workflows and enhance productivity.",
    fullDescription: "We leverage artificial intelligence and machine learning to automate repetitive tasks, streamline workflows, and unlock new efficiencies for your business. Our AI automation solutions range from intelligent chatbots and process automation to predictive analytics and personalized user experiences. We help you work smarter, reduce costs, and stay ahead of the competition.",
    icon: BrainCircuit,
    slug: "ai-automation",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function ServicesPreview() {
  return (
    <section id="services" className="section-padding bg-background relative">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid-subtle" />
      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-section text-gradient font-heading">Our Services</h2>
          <p className="mt-4 text-lg text-silver max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.slug}
                variants={cardVariants}
                className="glass-card glass-hover p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-silver leading-relaxed mb-3">
                  {service.description}
                </p>
                <p className="text-sm text-silver leading-relaxed mb-5 opacity-80">
                  {service.fullDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm font-medium text-primary inline-flex items-center gap-1 group/link"
                >
                  Learn More
                  <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
