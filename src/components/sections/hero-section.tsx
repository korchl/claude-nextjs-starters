import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  badge: string
  title: string
  description: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

// 히어로 섹션 — 랜딩 페이지 최상단
export function HeroSection({
  badge,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  return (
    <section className="relative px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      {/* 배경 그래디언트 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        {/* 뱃지 */}
        <Badge className="mb-4 inline-block">{badge}</Badge>

        {/* 제목 */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* 설명 */}
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          {description}
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
