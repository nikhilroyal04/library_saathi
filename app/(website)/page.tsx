import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import AboutSection from "@/components/home/about-section"
import ShiftPlanSection from "@/components/home/shift-plan-section"
import GallerySection from "@/components/home/galley-section"
import TestimonialSection from "@/components/home/testimonial-section"
import FAQSection from "@/components/home/faq-section"
import ContactSection from "@/components/home/contact-section"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <ShiftPlanSection />
      <GallerySection />
      <AboutSection />
      <TestimonialSection />
      <FAQSection />
      <ContactSection />
    </div>
  )
}