export interface ProjectData {
  slug: string
  title: string
  description: string
  client: string
  industry: string
  overview: string
  challenge: string
  solution: string
  technologies: string[]
  results: string[]
  testimonial: { name: string; company: string; content: string }
  category: string
  liveUrl?: string
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    slug: "velora-luxury",
    title: "Velora Luxury",
    description: "A premium e-commerce experience for a high-end luxury goods brand.",
    client: "Velora Inc.",
    industry: "Luxury Goods",
    overview: "Velora Luxury approached us to create an exclusive online presence that matched their prestigious brick-and-mortar boutiques. The goal was to deliver a shopping experience that felt as luxurious as their products.",
    challenge: "The challenge was translating the tactile luxury experience of in-store shopping to the digital realm. The site needed to convey exclusivity, showcase products in stunning detail, and provide a seamless checkout process for high-ticket items.",
    solution: "We designed a minimalist, image-first interface with immersive product galleries, rich storytelling sections, and a streamlined checkout flow. Custom animations and micro-interactions add a sense of elegance at every touchpoint.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify", "Stripe", "Framer Motion", "Cloudinary"],
    results: [
      "156% increase in online revenue within the first quarter",
      "43% reduction in cart abandonment rate",
      "4.8/5 average user satisfaction score",
      "Featured in several luxury lifestyle publications"
    ],
    testimonial: {
      name: "Isabelle Moreau",
      company: "Velora Inc.",
      content: "NSH Media transformed our digital presence completely. Our online store now reflects the same luxury and attention to detail that our physical boutiques are known for."
    },
    category: "Ecommerce",
    liveUrl: "https://velora-luxury.example.com"
  },
  {
    slug: "greenleaf-organics",
    title: "GreenLeaf Organics",
    description: "A vibrant brand identity and website for an organic food company.",
    client: "GreenLeaf Organics",
    industry: "Food & Beverage",
    overview: "GreenLeaf Organics needed a complete brand overhaul and a new website to launch their organic product line nationally. They wanted to communicate freshness, sustainability, and health.",
    challenge: "The brand needed to stand out in a crowded organic market while maintaining authenticity. The website had to educate consumers about organic benefits while driving product sales through retail partners.",
    solution: "We created a fresh, nature-inspired brand identity with earthy tones and botanical illustrations. The website features rich storytelling, educational content, and a store locator to find nearby retailers.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Mapbox", "Chart.js"],
    results: [
      "200% increase in website traffic within 2 months",
      "85% of visitors engaged with educational content",
      "Featured in major health food publications",
      "45% increase in retail partnership inquiries"
    ],
    testimonial: {
      name: "Marcus Chen",
      company: "GreenLeaf Organics",
      content: "The team at NSH Media truly understood our mission. They created a brand and website that perfectly captures our commitment to healthy, sustainable food."
    },
    category: "Web Design",
    liveUrl: "https://greenleaf-organics.example.com"
  },
  {
    slug: "metro-realty-hub",
    title: "Metro Realty Hub",
    description: "A powerful real estate platform with advanced property search and virtual tours.",
    client: "Metro Realty Group",
    industry: "Real Estate",
    overview: "Metro Realty Group needed a modern platform that would give them a competitive edge in the fast-paced real estate market. They wanted advanced search capabilities and immersive property presentations.",
    challenge: "The platform needed to handle large property databases with complex filtering, integrate with multiple MLS systems, and provide virtual tour capabilities that worked seamlessly across devices.",
    solution: "We built a custom real estate platform with AI-powered search, interactive maps, 3D virtual tours, and automated listing syndication. The platform processes thousands of listings with sub-second search results.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Elasticsearch", "Mapbox", "Three.js", "Docker", "AWS"],
    results: [
      "300% increase in property listing views",
      "68% of users completed virtual tours",
      "40% reduction in time-to-close for listings",
      "Top-rated real estate platform in the region"
    ],
    testimonial: {
      name: "Sarah Mitchell",
      company: "Metro Realty Group",
      content: "NSH Media built a platform that completely transformed how we do business. The virtual tour feature alone has been a game-changer for our agents and clients."
    },
    category: "Development",
    liveUrl: "https://metro-realty.example.com"
  },
  {
    slug: "fittrack-pro",
    title: "FitTrack Pro",
    description: "A comprehensive fitness tracking application with personalized workout plans.",
    client: "FitTrack Inc.",
    industry: "Health & Fitness",
    overview: "FitTrack Pro is a web application that provides personalized fitness plans, progress tracking, and social features. The client wanted to combine expert training knowledge with modern technology.",
    challenge: "The application needed to generate dynamic workout plans based on user goals, fitness levels, and available equipment. It also needed real-time progress tracking and social features for community engagement.",
    solution: "We developed a full-stack application with an intelligent workout generator, real-time progress dashboards, and a social feed for community interaction. The platform uses machine learning to optimize workout recommendations.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "WebSocket", "TensorFlow.js"],
    results: [
      "50,000+ active users within 6 months of launch",
      "75% user retention rate after 90 days",
      "4.7/5 app store rating",
      "Featured as a top fitness app by major tech publications"
    ],
    testimonial: {
      name: "James Rodriguez",
      company: "FitTrack Inc.",
      content: "NSH Media delivered an exceptional product. Their technical expertise and understanding of the fitness industry made the entire process smooth and the result outstanding."
    },
    category: "Development"
  },
  {
    slug: "urbanthreads",
    title: "UrbanThreads",
    description: "A fashion e-commerce platform with personalized styling recommendations.",
    client: "UrbanThreads Co.",
    industry: "Fashion",
    overview: "UrbanThreads is a curated fashion marketplace that connects independent designers with style-conscious consumers. They needed a platform that showcased unique pieces while providing a personalized shopping experience.",
    challenge: "The platform needed to handle multiple seller accounts, inventory synchronization, and provide AI-powered style recommendations. The checkout flow needed to support complex shipping rules across international sellers.",
    solution: "We built a multi-vendor marketplace with AI-driven style recommendations based on user preferences and browsing behavior. The platform includes automated inventory management and a unified checkout system.",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe Connect", "Redis", "Docker"],
    results: [
      "500+ independent designers onboarded in first year",
      "$2M+ in gross merchandise value within 6 months",
      "35% conversion rate from recommendation engine",
      "98% seller satisfaction rate"
    ],
    testimonial: {
      name: "Elena Voss",
      company: "UrbanThreads Co.",
      content: "The AI recommendation system NSH Media built has been incredible. It's driven a huge portion of our revenue and our customers love discovering new designers."
    },
    category: "Ecommerce",
    liveUrl: "https://urbanthreads.example.com"
  },
  {
    slug: "bloom-and-petal",
    title: "Bloom & Petal",
    description: "An elegant floral delivery service with same-day delivery optimization.",
    client: "Bloom & Petal",
    industry: "Floral & Gifts",
    overview: "Bloom & Petal wanted to expand their local flower shop into a thriving online delivery service. They needed a beautiful website with smart logistics for same-day delivery across the city.",
    challenge: "The main challenge was building a real-time delivery scheduling system that optimized routes and guaranteed same-day delivery. The website also needed to display fresh inventory that changed daily.",
    solution: "We designed a visually stunning floral website with real-time inventory, a smart delivery scheduler, and route optimization. The platform integrates with local florists for expanded coverage.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Google Maps API"],
    results: [
      "180% increase in online orders within first month",
      "95% on-time delivery rate",
      "Expanded from 1 to 15 delivery zones",
      "Featured in local lifestyle magazines"
    ],
    testimonial: {
      name: "Lily Nakamura",
      company: "Bloom & Petal",
      content: "NSH Media created a stunning website that perfectly captures the beauty of our arrangements. The delivery optimization has been a game-changer for our business."
    },
    category: "Ecommerce"
  }
]
