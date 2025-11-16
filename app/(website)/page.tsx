import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import HowItWorksSection from "@/components/home/how-it-works-section"
import CTASection from "@/components/home/cta-section"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  )
}