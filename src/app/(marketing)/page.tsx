import { siteConfig } from "@/config/site"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CtaSection } from "@/components/sections/cta-section"

// 랜딩 페이지
export default function Home() {
  return (
    <>
      <HeroSection {...siteConfig.hero} />
      <FeaturesSection features={siteConfig.features} />
      <CtaSection {...siteConfig.cta} />
    </>
  )
}
