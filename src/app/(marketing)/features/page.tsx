import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { PageHeader } from "@/components/shared/page-header"
import { FeaturesSection } from "@/components/sections/features-section"

export const metadata: Metadata = {
  title: "예제",
  description: "ModernStarter의 핵심 기능들을 직접 확인해보세요.",
}

export default function FeaturesPage() {
  return (
    <>
      <div className="px-4 pt-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <PageHeader
            title="예제"
            description="ModernStarter의 핵심 기능들을 직접 확인해보세요."
          />
        </div>
      </div>
      <FeaturesSection features={siteConfig.features} />
    </>
  )
}
