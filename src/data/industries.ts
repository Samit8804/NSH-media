export interface Industry {
  slug: string
  name: string
  tagline: string
  description: string
  metaDescription: string
  services: string[]
}

/**
 * Industry pages describe how the three verified services apply to a sector.
 * They must not imply that NSH Media Services offers unverified disciplines.
 */
export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Clear, accessible digital experiences",
    description:
      "Healthcare websites often need clear service information, accessible navigation, and secure patient-facing flows. Our web design and web development services can support service directories, patient portals, and internal tools.",
    metaDescription:
      "Healthcare website design and development for clear service information, accessible navigation, and patient-facing flows.",
    services: ["Web Design", "Web Development"],
  },
  {
    slug: "finance",
    name: "Finance",
    tagline: "Trust through clarity",
    description:
      "Financial services websites need clarity, trust, and reliable performance. Our web design and web development services can support marketing sites, customer portals, and dashboard interfaces.",
    metaDescription:
      "Finance website design and development for clear, trustworthy marketing sites, customer portals, and dashboards.",
    services: ["Web Design", "Web Development"],
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    tagline: "Commerce that converts",
    description:
      "E-commerce projects need straightforward product journeys and clear checkout flows. Our e-commerce, web design, and web development services can support storefront design, payment integration, and storefront architecture that can grow with the business.",
    metaDescription:
      "E-commerce website design and development for clear product journeys, checkout flows, and payment integration.",
    services: ["E-Commerce", "Web Design", "Web Development"],
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Learning without limits",
    description:
      "Education websites need to make information easy to find for learners, educators, and administrators. Our web design and web development services can support school sites, course catalogues, and learning platforms.",
    metaDescription:
      "Education website design and development for school sites, course catalogues, and learning platforms.",
    services: ["Web Design", "Web Development"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "Spaces presented clearly",
    description:
      "Property websites need strong search, clear listing pages, and simple enquiry flows. Our web design and web development services can support property search, detail pages, and enquiry journeys.",
    metaDescription:
      "Real estate website design and development for property search, listing pages, and simple enquiry flows.",
    services: ["Web Design", "Web Development", "E-Commerce"],
  },
  {
    slug: "technology",
    name: "Technology",
    tagline: "Built for builders",
    description:
      "Technology companies often need marketing sites and product interfaces that can evolve with the product. Our web design and web development services can support marketing pages, product pages, and web applications.",
    metaDescription:
      "Technology website design and development for marketing sites, product pages, and web applications.",
    services: ["Web Design", "Web Development"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    tagline: "Stays that delight",
    description:
      "Hospitality websites need clear information and simple booking or enquiry paths. Our web design and web development services can support booking flows, guest information, and brand sites.",
    metaDescription:
      "Hospitality website design and development for booking flows, guest information, and brand sites.",
    services: ["Web Design", "Web Development"],
  },
  {
    slug: "startups",
    name: "Startups",
    tagline: "From idea to launch",
    description:
      "Startups need a focused website that explains the offer quickly and gives early customers a clear next step. Our web design and web development services can support launch sites and early product interfaces.",
    metaDescription:
      "Startup website design and development for focused launch sites and early product interfaces.",
    services: ["Web Design", "Web Development", "E-Commerce"],
  },
]

export const INDUSTRY_SERVICE_SLUGS: Record<string, string> = {
  "Web Design": "web-design",
  "Web Development": "web-development",
  "E-Commerce": "ecommerce",
}
