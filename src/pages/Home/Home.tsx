import CoverageSection from "@/components/sections/coverage-section";
import CTASection from "@/components/sections/cta-section";
import FAQSection from "@/components/sections/faq-section";
import HeroSection from "@/components/sections/hero-section";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import MobileAppSection from "@/components/sections/mobile-app-section";
import PartnersSection from "@/components/sections/partners-section";
import PricingSection from "@/components/sections/pricing-section";
import ServicesSection from "@/components/sections/services-section";
import StatsSection from "@/components/sections/stats-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import TrackingSection from "@/components/sections/tracking-section";


export default function Home() {
  return (
    <div>
        <HeroSection />
      <TrackingSection />
      <ServicesSection />
      <HowItWorksSection />
      <StatsSection />
      <PricingSection />
      <CoverageSection />
      <MobileAppSection />
      <TestimonialsSection />
      <PartnersSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
