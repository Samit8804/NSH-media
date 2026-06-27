import type { BlogPost, Project, Service, TeamMember, Testimonial, FAQ, Pricing } from '@prisma/client';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nshmedia.com';

interface SchemaOrg {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

export function organizationSchema(): SchemaOrg {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NSH Media',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description: 'Building Digital Experiences That Drive Growth',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+1-555-123-4567',
      contactType: 'customer service',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@nshmedia.com',
      availableLanguage: ['English'],
    },
    sameAs: [
      process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/nshmedia',
      process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/nshmedia',
      process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/nshmedia',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };
}

export function websiteSchema(): SchemaOrg {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NSH Media',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webpageSchema(title: string, description: string, url: string, dateModified?: string): SchemaOrg {
  const schema: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${BASE_URL}${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'NSH Media',
      logo: `${BASE_URL}/favicon.svg`,
    },
  };
  if (dateModified) {
    schema.dateModified = dateModified;
  }
  return schema;
}

export function breadcrumbSchema(items: { name: string; url: string }[]): SchemaOrg {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featuredImage?: string | null;
  publishedAt: Date | string;
  updatedAt: Date | string;
  tags?: string[];
  categories?: string[];
}): SchemaOrg {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.featuredImage || `${BASE_URL}/og-default.svg`,
    datePublished: post.publishedAt instanceof Date ? post.publishedAt.toISOString() : post.publishedAt,
    dateModified: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NSH Media',
      logo: `${BASE_URL}/favicon.svg`,
    },
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
  };
}

export function blogPostingSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featuredImage?: string | null;
  publishedAt: Date | string;
  updatedAt: Date | string;
  tags?: string[];
  categories?: string[];
}): SchemaOrg {
  const schema = articleSchema(post);
  schema['@type'] = 'BlogPosting';
  return schema;
}

export function serviceSchema(service: {
  title: string;
  slug: string;
  description: string;
  image?: string | null;
  price?: string | null;
}): SchemaOrg {
  const schema: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'NSH Media',
    },
    image: service.image || `${BASE_URL}/og-default.svg`,
  };
  if (service.price) {
    schema.offers = {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'USD',
    };
  }
  return schema;
}

export function projectSchema(project: {
  title: string;
  slug: string;
  description: string;
  client?: string;
  category?: string;
  technologies?: string[];
  thumbnail?: string | null;
  url?: string | null;
  publishedAt?: Date | string;
}): SchemaOrg {
  const schema: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/portfolio/${project.slug}`,
    image: project.thumbnail || `${BASE_URL}/og-default.svg`,
  };
  if (project.client) {
    schema.author = { '@type': 'Organization', name: project.client };
  }
  if (project.category) {
    schema.genre = project.category;
  }
  if (project.technologies?.length) {
    schema.keywords = project.technologies.join(', ');
  }
  if (project.url) {
    schema.sameAs = project.url;
  }
  if (project.publishedAt) {
    schema.datePublished = project.publishedAt instanceof Date ? project.publishedAt.toISOString() : project.publishedAt;
  }
  return schema;
}

export function faqPageSchema(faqs: { question: string; answer: string }[]): SchemaOrg {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function personSchema(member: {
  name: string;
  role: string;
  bio?: string;
  image?: string | null;
}): SchemaOrg {
  const schema: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio || '',
    worksFor: {
      '@type': 'Organization',
      name: 'NSH Media',
    },
  };
  if (member.image) {
    schema.image = member.image;
  }
  return schema;
}

export function localBusinessSchema(): SchemaOrg {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NSH Media',
    image: `${BASE_URL}/favicon.svg`,
    url: BASE_URL,
    telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+1-555-123-4567',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@nshmedia.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: process.env.NEXT_PUBLIC_CITY || 'San Francisco',
      addressRegion: process.env.NEXT_PUBLIC_STATE || 'CA',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '18:00' },
    ],
  };
}

export function reviewSchema(review: {
  author: string;
  content: string;
  rating?: number;
}): SchemaOrg {
  const schema: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: review.author },
    reviewBody: review.content,
  };
  if (review.rating) {
    schema.reviewRating = { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 };
  }
  return schema;
}

export function productPricingSchema(plan: {
  name: string;
  description: string;
  price: number | string;
  currency?: string;
  features?: string[];
}): SchemaOrg {
  const schema: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: plan.name,
    description: plan.description,
    offers: {
      '@type': 'Offer',
      price: typeof plan.price === 'number' ? plan.price.toString() : plan.price,
      priceCurrency: plan.currency || 'USD',
      availability: 'https://schema.org/OnlineOnly',
    },
  };
  if (plan.features?.length) {
    schema.keywords = plan.features.join(', ');
  }
  return schema;
}

export function renderJsonLd(schema: SchemaOrg): string {
  return JSON.stringify(schema);
}
