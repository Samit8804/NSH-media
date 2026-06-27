export interface ServiceData {
  slug: string
  title: string
  description: string
  longDescription: string
  icon: string
  benefits: string[]
  features: string[]
  process: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "web-design",
    title: "Web Design",
    description: "We craft stunning, user-centered designs that captivate audiences and drive engagement.",
    longDescription: "Our web design service combines aesthetic excellence with user-centered principles to create digital experiences that leave lasting impressions. Every pixel is carefully considered to ensure your brand's unique identity shines through while delivering an intuitive, accessible experience for your users.",
    icon: "Palette",
    benefits: [
      "User-centered design approach that prioritizes your audience's needs",
      "Fully responsive designs that look perfect on every device",
      "Visual storytelling that communicates your brand narrative effectively",
      "Conversion-optimized layouts that turn visitors into customers",
      "Consistent brand identity across all pages and touchpoints"
    ],
    features: [
      "Custom UI/UX design tailored to your brand",
      "Wireframing and interactive prototyping",
      "Responsive and mobile-first design",
      "Visual identity systems and style guides",
      "Interactive micro-animations and transitions",
      "WCAG accessibility compliance"
    ],
    process: [
      { title: "Discovery", description: "We dive deep into your brand, audience, and goals through stakeholder interviews and market research." },
      { title: "Research", description: "We analyze competitors, user behaviors, and industry trends to inform our design strategy." },
      { title: "Wireframing", description: "We create low-fidelity wireframes to establish structure, hierarchy, and user flow before visual design." },
      { title: "Visual Design", description: "We bring wireframes to life with polished UI, typography, color palettes, and imagery." },
      { title: "Prototyping", description: "We build interactive prototypes for user testing and stakeholder approval before development." }
    ],
    faqs: [
      { question: "How long does a web design project typically take?", answer: "Most web design projects take 4-8 weeks depending on complexity. A simple 5-page brochure site may take 3-4 weeks, while a complex platform can take 10-12 weeks." },
      { question: "Do you include mobile design in your process?", answer: "Absolutely. We follow a mobile-first approach, designing for small screens first and scaling up to desktop. Every design is fully responsive across all devices." },
      { question: "Can you redesign an existing website?", answer: "Yes, we specialize in redesigns. We'll audit your current site, identify pain points, and create a fresh design that preserves what works while improving the rest." },
      { question: "What deliverables do I receive?", answer: "You'll receive complete Figma files, a style guide, all exported assets, an interactive prototype, and developer handoff documentation." }
    ]
  },
  {
    slug: "web-development",
    title: "Web Development",
    description: "We build high-performance web applications using cutting-edge technologies and best practices.",
    longDescription: "Our development team transforms designs into fast, secure, and scalable web applications. We leverage modern frameworks, clean architecture, and rigorous testing to deliver digital products that perform flawlessly under any load.",
    icon: "Code2",
    benefits: [
      "Scalable architecture that grows with your business",
      "Clean, maintainable code following industry best practices",
      "Optimized performance with fast load times and smooth interactions",
      "Enterprise-grade security protecting your data and users",
      "Future-proof technology stack that's easy to extend"
    ],
    features: [
      "Custom full-stack web application development",
      "Third-party API integration and development",
      "Headless CMS implementation",
      "Database design and optimization",
      "Security implementation and penetration testing",
      "Performance optimization and Core Web Vitals"
    ],
    process: [
      { title: "Requirements Analysis", description: "We define technical requirements, system architecture, and technology stack based on your project needs." },
      { title: "Architecture Design", description: "We design scalable system architecture, database schemas, and API structures." },
      { title: "Agile Development", description: "We develop in iterative sprints with regular demos, code reviews, and continuous integration." },
      { title: "Testing", description: "We conduct comprehensive testing including unit, integration, e2e, and performance tests." },
      { title: "Deployment", description: "We deploy to production with CI/CD pipelines, monitoring, and rollback procedures." }
    ],
    faqs: [
      { question: "What technologies do you use?", answer: "We primarily use Next.js, React, TypeScript, Node.js, and PostgreSQL. We choose the best tech stack based on each project's specific requirements." },
      { question: "Do you offer ongoing support after launch?", answer: "Yes, we offer maintenance and support packages to keep your application running smoothly with updates, monitoring, and feature additions." },
      { question: "How do you handle project revisions?", answer: "We work in agile sprints with regular check-ins. Feedback is incorporated during each sprint, and we have a structured change request process for scope changes." },
      { question: "Can you integrate with my existing systems?", answer: "Yes, we have extensive experience integrating with third-party platforms, legacy systems, and custom APIs to create seamless data flows." }
    ]
  },
  {
    slug: "ecommerce",
    title: "E-Commerce",
    description: "We create powerful online stores that convert visitors into loyal, repeat customers.",
    longDescription: "From product catalogs to checkout flows, we design and develop e-commerce experiences that maximize conversion rates. Our solutions are built for scale, security, and seamless shopping experiences across every device.",
    icon: "ShoppingCart",
    benefits: [
      "Optimized checkout flows that reduce cart abandonment",
      "Seamless inventory and order management systems",
      "Mobile-optimized shopping experiences",
      "Secure payment processing with multiple gateway options",
      "Data-driven analytics for informed business decisions"
    ],
    features: [
      "Custom shopping cart and checkout system",
      "Multiple payment gateway integration",
      "Product catalog and inventory management",
      "Order tracking and fulfillment automation",
      "Advanced search and filtering",
      "Multi-currency and multi-language support"
    ],
    process: [
      { title: "Strategy", description: "We define your e-commerce goals, target audience, product strategy, and competitive positioning." },
      { title: "UX Design", description: "We design intuitive shopping experiences with streamlined navigation, product pages, and checkout flows." },
      { title: "Development", description: "We build your store with robust product management, cart logic, and payment integration." },
      { title: "Testing", description: "We rigorously test payment flows, inventory management, and user journeys across devices." },
      { title: "Launch", description: "We deploy your store, configure analytics, and provide training for your team to manage operations." }
    ],
    faqs: [
      { question: "Which e-commerce platform do you recommend?", answer: "We recommend based on your needs. Shopify for quick launches, WooCommerce for WordPress integration, or custom solutions for unique requirements." },
      { question: "How do you handle payment security?", answer: "We implement PCI-compliant payment processing, SSL encryption, tokenization, and integrate with trusted payment gateways like Stripe and PayPal." },
      { question: "Can you migrate my existing store?", answer: "Yes, we handle full migrations including products, customer data, order history, and SEO preservation with minimal downtime." },
      { question: "Do you include SEO for product pages?", answer: "Yes, we optimize all product pages with structured data, meta tags, clean URLs, and proper heading hierarchy for maximum search visibility." }
    ]
  },
  {
    slug: "seo",
    title: "SEO",
    description: "We boost your online visibility with data-driven SEO strategies that deliver measurable results.",
    longDescription: "Our SEO service combines technical expertise with creative content strategy to improve your search rankings and drive qualified organic traffic. We use data-backed methodologies to achieve sustainable, long-term growth.",
    icon: "Search",
    benefits: [
      "Higher search engine rankings on Google and Bing",
      "Increased organic traffic from qualified leads",
      "Improved conversion rates from targeted traffic",
      "Enhanced local visibility for geographic reach",
      "Competitive advantage through strategic positioning"
    ],
    features: [
      "Comprehensive keyword research and strategy",
      "On-page SEO optimization and content audits",
      "Technical SEO and site structure optimization",
      "Quality link building and outreach campaigns",
      "Content strategy and creation",
      "Monthly analytics reporting and insights"
    ],
    process: [
      { title: "Audit", description: "We conduct a thorough SEO audit analyzing technical issues, content gaps, and backlink profile." },
      { title: "Research", description: "We perform keyword research, competitor analysis, and audience intent mapping." },
      { title: "Optimization", description: "We implement on-page, technical, and content optimizations across your site." },
      { title: "Content", description: "We create and optimize high-quality content targeting strategic keywords." },
      { title: "Monitoring", description: "We track rankings, traffic, and conversions with monthly reporting and strategy adjustments." }
    ],
    faqs: [
      { question: "How long does SEO take to show results?", answer: "SEO is a long-term strategy. Most clients see initial improvements within 3-6 months, with significant results visible after 6-12 months of consistent effort." },
      { question: "Do you guarantee first-page rankings?", answer: "No ethical SEO agency can guarantee specific rankings. We guarantee data-driven strategies, transparent reporting, and continuous improvement based on best practices." },
      { question: "What's included in your monthly SEO package?", answer: "Monthly packages include ongoing keyword research, content creation, technical audits, link building, competitor tracking, and detailed performance reports." },
      { question: "Do you work with local businesses?", answer: "Yes, we specialize in local SEO including Google Business Profile optimization, local citation building, and location-specific content strategies." }
    ]
  },
  {
    slug: "branding",
    title: "Branding",
    description: "We build memorable brands that resonate with your audience and stand the test of time.",
    longDescription: "Branding is more than a logo. We craft complete brand identities that communicate your values, differentiate you from competitors, and create emotional connections with your audience across every touchpoint.",
    icon: "Fingerprint",
    benefits: [
      "Strong brand recognition and recall in your market",
      "Emotional connection with your target audience",
      "Clear differentiation from competitors",
      "Consistent brand experience across all channels",
      "Increased customer loyalty and trust"
    ],
    features: [
      "Custom logo design and brand mark creation",
      "Comprehensive brand guidelines and playbooks",
      "Color palette and typography systems",
      "Brand strategy and positioning",
      "Visual asset creation and templates",
      "Brand messaging and voice guidelines"
    ],
    process: [
      { title: "Discovery", description: "We explore your vision, values, market position, and target audience through in-depth workshops." },
      { title: "Strategy", description: "We define brand positioning, personality, messaging framework, and visual direction." },
      { title: "Visual Identity", description: "We design logos, color systems, typography, and visual elements that embody your brand." },
      { title: "Brand Guidelines", description: "We create comprehensive guidelines ensuring consistent brand application across all mediums." },
      { title: "Application", description: "We apply your brand to key touchpoints including website, stationery, social media, and marketing materials." }
    ],
    faqs: [
      { question: "What's included in a full branding package?", answer: "Our branding package includes brand strategy, logo design, color palette, typography, brand guidelines, and application to key collateral pieces." },
      { question: "How long does the branding process take?", answer: "A comprehensive branding project typically takes 6-10 weeks from discovery to final deliverables, depending on complexity and revision rounds." },
      { question: "Can you rebrand an existing company?", answer: "Yes, we handle full rebrands and brand refreshes. We're careful to preserve brand equity while modernizing your identity for current markets." },
      { question: "Do you offer standalone logo design?", answer: "Yes, we offer logo design as a standalone service, though we recommend the full branding package for the most cohesive results." }
    ]
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description: "We transform your business with intelligent AI-powered automation that saves time and money.",
    longDescription: "Leverage cutting-edge artificial intelligence to automate repetitive tasks, gain insights from your data, and deliver personalized experiences at scale. Our AI solutions are practical, measurable, and designed to deliver immediate ROI.",
    icon: "Brain",
    benefits: [
      "Significant cost savings through process automation",
      "Increased team productivity by eliminating repetitive tasks",
      "24/7 operation capability with AI-powered systems",
      "Reduced human error in data processing tasks",
      "Scalable solutions that grow with your business"
    ],
    features: [
      "Intelligent process automation and workflow design",
      "AI-powered chatbots and virtual assistants",
      "Automated data analysis and reporting",
      "Predictive analytics and forecasting",
      "Natural language processing for document handling",
      "Custom machine learning model development"
    ],
    process: [
      { title: "Discovery", description: "We identify automation opportunities and assess AI readiness across your business processes." },
      { title: "Solution Design", description: "We design AI solutions tailored to your specific use cases, data sources, and business objectives." },
      { title: "Development", description: "We build and train AI models, develop integrations, and create user interfaces." },
      { title: "Training", description: "We train AI models on your data and refine accuracy through iterative testing." },
      { title: "Deployment", description: "We deploy your AI solution, monitor performance, and provide team training for ongoing use." }
    ],
    faqs: [
      { question: "What business processes can be automated with AI?", answer: "Common automation areas include customer support, data entry, document processing, email marketing, lead qualification, inventory management, and reporting." },
      { question: "Do I need technical knowledge to use AI solutions?", answer: "No, we design all our AI solutions with user-friendly interfaces. Your team can use them without any technical expertise." },
      { question: "How long does it take to implement an AI solution?", answer: "Implementation timelines vary by complexity. Simple automation can be deployed in 2-4 weeks, while complex AI systems may take 2-3 months." },
      { question: "Is my data safe with AI systems?", answer: "Absolutely. We implement enterprise-grade security, data encryption, and comply with GDPR and other regulations. Your data remains yours and is never used to train public models." }
    ]
  }
]
