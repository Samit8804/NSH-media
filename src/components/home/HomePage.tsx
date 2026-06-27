"use client"

import HeroSection from "@/components/home/HeroSection"
import TrustedBySection from "@/components/home/TrustedBySection"
import ServicesPreview from "@/components/home/ServicesPreview"
import ProcessSection from "@/components/home/ProcessSection"
import StatisticsCounter from "@/components/home/StatisticsCounter"
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio"
import IndustriesSection from "@/components/home/IndustriesSection"
import TechnologiesSection from "@/components/home/TechnologiesSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import FAQPreview from "@/components/home/FAQPreview"
import FinalCTASection from "@/components/home/FinalCTASection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <ServicesPreview />
      <ProcessSection />
      <StatisticsCounter />
      <FeaturedPortfolio />
      <IndustriesSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <FAQPreview />
      <FinalCTASection />
    </>
  )
}
