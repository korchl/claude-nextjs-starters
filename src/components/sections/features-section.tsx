import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import {
  Zap,
  Palette,
  Layout,
  Code,
  BarChart,
  Smile,
  LucideIcon,
} from "lucide-react"

interface FeatureItem {
  icon: string
  title: string
  description: string
  href: string
}

interface FeaturesSectionProps {
  features: FeatureItem[]
}

// 아이콘 이름을 실제 컴포넌트로 매핑
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Palette,
  Layout,
  Code,
  BarChart: BarChart,
  Smile,
}

// 기능 카드 그리드 섹션
export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* 섹션 헤더 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            핵심 기능
          </h2>
          <p className="text-lg text-muted-foreground">
            현대적인 웹 개발을 위한 모든 것을 갖추고 있습니다
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon]
            return (
              <Link key={index} href={feature.href}>
                <Card className="cursor-pointer transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4">
                      {Icon && (
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="size-6 text-primary" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
