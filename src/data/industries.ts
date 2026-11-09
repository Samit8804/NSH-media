export interface Industry {
  slug: string
  name: string
  tagline: string
  description: string
  services: string[]
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Digital experiences that care",
    description:
      "We build compassionate, reliable digital products for the healthcare sector — from patient portals and telehealth platforms to data-driven care workflows that put patients first.",
    services: ["Web Development", "AI Automation", "Branding", "Web Design"],
  },
  {
    slug: "finance",
    name: "Finance",
    tagline: "Trust, engineered",
    description:
      "We create secure, compliant, high-performance digital experiences for financial services — dashboards, portals, and customer journeys that balance trust with modern design.",
    services: ["Web Development", "Security & Compliance", "Web Design", "AI Automation"],
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    tagline: "Commerce that converts",
    description:
      "We design and build e-commerce experiences that turn browsers into buyers with seamless checkout flows, conversion-focused design, and scalable storefront architecture.",
    services: ["E-Commerce", "Web Design", "Web Development", "SEO"],
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Learning without limits",
    description:
      "We craft engaging digital learning platforms and educational experiences that make knowledge accessible, interactive, and effective for learners of all ages.",
    services: ["Web Development", "Web Design", "AI Automation"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "Spaces that sell",
    description:
      "We build immersive real estate experiences — property portals, virtual tours, and listing platforms that help clients showcase spaces and close faster.",
    services: ["Web Development", "Web Design", "E-Commerce"],
  },
  {
    slug: "technology",
    name: "Technology",
    tagline: "Built for builders",
    description:
      "We partner with tech companies to ship products, internal tools, and developer-facing platforms that scale with ambitious roadmaps.",
    services: ["Web Development", "AI Automation", "Branding"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    tagline: "Stays that delight",
    description:
      "We design hospitality experiences — booking platforms, brand sites, and guest journeys — that reflect the warmth and quality of the service itself.",
    services: ["Web Design", "Web Development", "Branding"],
  },
  {
    slug: "startups",
    name: "Startups",
    tagline: "From idea to launch",
    description:
      "We help startups move from concept to market with lean, high-impact websites and products that communicate vision fast and attract early customers.",
    services: ["Web Design", "Web Development", "Branding", "SEO"],
  },
];
