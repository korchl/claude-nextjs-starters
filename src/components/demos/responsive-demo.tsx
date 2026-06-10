"use client"

import { useState } from "react"
import { Smartphone, Tablet, Monitor, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Breakpoint = "mobile" | "tablet" | "desktop"

const breakpoints: Record<Breakpoint, {
  label: string
  icon: React.ElementType
  range: string
  cols: number
  tailwind: string
  description: string
}> = {
  mobile: {
    label: "모바일",
    icon: Smartphone,
    range: "< 768px",
    cols: 1,
    tailwind: "grid-cols-1",
    description: "단일 열 레이아웃 (기본값)",
  },
  tablet: {
    label: "태블릿",
    icon: Tablet,
    range: "768px ~ 1023px",
    cols: 2,
    tailwind: "md:grid-cols-2",
    description: "2열 레이아웃",
  },
  desktop: {
    label: "데스크탑",
    icon: Monitor,
    range: "≥ 1024px",
    cols: 3,
    tailwind: "lg:grid-cols-3",
    description: "3열 레이아웃",
  },
}

const patterns = [
  { cls: "grid md:grid-cols-2 lg:grid-cols-3", desc: "반응형 그리드 (1→2→3열)" },
  { cls: "flex flex-col md:flex-row",          desc: "방향 전환 (세로→가로)" },
  { cls: "hidden md:flex",                     desc: "md 이상에서만 표시" },
  { cls: "md:hidden",                          desc: "md 미만에서만 표시 (햄버거 메뉴)" },
  { cls: "px-4 md:px-6 lg:px-8",              desc: "단계별 패딩 확장" },
  { cls: "text-4xl md:text-5xl lg:text-6xl",  desc: "단계별 글씨 크기 확장" },
]

export function ResponsiveDemo() {
  const [current, setCurrent] = useState<Breakpoint>("mobile")
  const bp = breakpoints[current]

  return (
    <div className="space-y-8">
      {/* 브레이크포인트 선택기 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">브레이크포인트 선택</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(breakpoints) as [Breakpoint, typeof bp][]).map(([key, val]) => {
            const Icon = val.icon
            return (
              <Button
                key={key}
                variant={current === key ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrent(key)}
                className="gap-2"
              >
                <Icon className="size-4" />
                {val.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* 현재 브레이크포인트 정보 배너 */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg bg-muted px-4 py-3">
        <Badge variant="secondary">{bp.range}</Badge>
        <span className="text-sm text-muted-foreground">{bp.description}</span>
        <code className="ml-auto rounded bg-background px-2 py-1 text-xs font-mono">
          {bp.tailwind}
        </code>
      </div>

      {/* 그리드 레이아웃 미리보기 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">
          그리드 레이아웃 미리보기
          <span className="ml-2 font-normal text-muted-foreground">({bp.cols}열)</span>
        </p>
        <div
          className="grid gap-3 transition-all duration-300"
          style={{ gridTemplateColumns: `repeat(${bp.cols}, minmax(0, 1fr))` }}
        >
          {["카드 A", "카드 B", "카드 C", "카드 D", "카드 E", "카드 F"].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-card p-4 text-center"
            >
              <p className="font-semibold text-primary">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">콘텐츠 영역</p>
            </div>
          ))}
        </div>
      </div>

      {/* 헤더 레이아웃 미리보기 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">헤더 레이아웃 미리보기</p>
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="flex h-12 items-center justify-between bg-background px-4">
            {/* 로고 — 항상 표시 */}
            <span className="font-bold text-sm">ModernStarter</span>

            {/* 데스크탑 네비 — desktop만 표시 */}
            {current === "desktop" && (
              <div className="flex gap-6 text-sm text-muted-foreground">
                <span className="text-foreground font-medium">홈</span>
                <span>예제</span>
                <span>대시보드</span>
              </div>
            )}

            {/* 태블릿 네비 — tablet도 표시 (md:flex) */}
            {current === "tablet" && (
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="text-foreground font-medium">홈</span>
                <span>예제</span>
                <span>대시보드</span>
              </div>
            )}

            {/* 메뉴 — mobile만 표시 (md:hidden) */}
            {current === "mobile" && (
              <Button variant="ghost" size="icon" className="size-8">
                <Menu className="size-4" />
              </Button>
            )}
          </div>

          {/* 설명 레이블 */}
          <div className="border-t border-border bg-muted px-4 py-2 text-xs text-muted-foreground">
            {current === "mobile"
              ? "모바일: 햄버거 메뉴 (md:hidden 클래스 적용)"
              : "태블릿·데스크탑: 네비게이션 링크 표시 (hidden md:flex 클래스 적용)"}
          </div>
        </div>
      </div>

      {/* Tailwind 반응형 패턴 참고표 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">이 프로젝트에서 사용하는 반응형 패턴</p>
        <div className="space-y-2">
          {patterns.map(({ cls, desc }) => (
            <div
              key={cls}
              className="flex flex-col gap-1 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <code className="shrink-0 rounded bg-muted px-2 py-1 text-xs font-mono">
                {cls}
              </code>
              <span className="text-sm text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
