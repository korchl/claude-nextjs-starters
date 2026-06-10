import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CtaSectionProps {
  title: string
  description: string
  button: { label: string; href: string }
}

// CTA (Call-To-Action) 섹션 — 페이지 하단 행동 유도
export function CtaSection({ title, description, button }: CtaSectionProps) {
  return (
    <section className="relative px-4 py-20 md:px-6 lg:px-8">
      {/* 배경 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        {/* 제목 */}
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>

        {/* 설명 */}
        <p className="mb-8 text-lg text-muted-foreground">
          {description}
        </p>

        {/* CTA 버튼 */}
        <Button asChild size="lg">
          <Link href={button.href}>{button.label}</Link>
        </Button>
      </div>
    </section>
  )
}
