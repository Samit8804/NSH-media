"use client"

import HeroSection from "@/components/home/HeroSection"
import ServicesPreview from "@/components/home/ServicesPreview"
import ProcessSection from "@/components/home/ProcessSection"
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio"
import IndustriesSection from "@/components/home/IndustriesSection"
import TechnologiesSection from "@/components/home/TechnologiesSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import FAQPreview from "@/components/home/FAQPreview"
import FinalCTASection from "@/components/home/FinalCTASection"
import WhyChooseSection from "@/components/home/WhyChooseSection"
import type { Testimonial } from "@/components/home/TestimonialsSection"

interface HomePageProps {
  testimonials?: Testimonial[]
  featuredProjects?: Array<{ title: string; category: string; tech: string[]; slug: string }>
  faqs?: Array<{ question: string; answer: string }>
  services?: Array<{ title: string; description: string; fullDescription: string; icon: string; slug: string }>
}

export default function HomePage({
  testimonials,
  featuredProjects,
  faqs,
  services,
}: HomePageProps) {
  return (
    <>
      <HeroSection />
      <ServicesPreview services={services} />
      <ProcessSection />
      <FeaturedPortfolio projects={featuredProjects} />
      <IndustriesSection />
      <TechnologiesSection />
      <TestimonialsSection testimonials={testimonials} />
      <FAQPreview faqs={faqs} />
      <FinalCTASection />
      <WhyChooseSection />
    </>
  )
}
