import { Metadata } from "next"
import { notFound } from "next/navigation"
import { siteConfig } from "@/config/site"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ResponsiveDemo } from "@/components/demos/responsive-demo"

// title/description은 siteConfig.features에서 slug로 룩업 — 중복 제거
const getFeatureConfig = (slug: string) =>
  siteConfig.features.find((f) => f.href === `/features/${slug}`)

// 동적 라우트 기능 예제 매핑 (content + example만 보유)
const featureExamples = {
  performance: {
    content:
      "이 스타터킷은 최신 Next.js 버전을 사용하여 최적화된 성능을 보장합니다. Turbopack을 활용한 빠른 빌드, 자동 코드 분할, 이미지 최적화 등이 기본으로 포함되어 있습니다.",
    example: "skeleton-demo",
  },
  theme: {
    content:
      "next-themes를 사용하여 시스템 설정을 존중하면서도 사용자가 원하는 테마로 전환할 수 있습니다. 상단의 테마 토글 버튼으로 직접 경험해보세요!",
    example: "theme-demo",
  },
  responsive: {
    content:
      "Tailwind CSS의 반응형 클래스를 활용하여 모든 기기에서 완벽한 UI를 제공합니다. 모바일 메뉴, 반응형 그리드 등이 기본으로 구현되어 있습니다.",
    example: "responsive-demo",
  },
  typescript: {
    content:
      "전체 프로젝트가 TypeScript로 작성되었으며, 강력한 타입 검사로 런타임 오류를 미리 방지합니다. react-hook-form + zod를 조합하여 폼 유효성 검사도 타입 안전하게 처리합니다.",
    example: "typescript-demo",
  },
  "data-table": {
    content:
      "대시보드의 DataTable 컴포넌트는 정렬, 필터링, 페이지네이션을 모두 지원합니다. 검색 입력시 debouncing으로 성능을 최적화했습니다.",
    example: "datatable-demo",
  },
  "ui-components": {
    content:
      "이 스타터킷에는 ShadcnUI의 모든 주요 컴포넌트가 설치되어 있습니다. 버튼, 카드, 다이얼로그, 폼, 테이블 등 다양한 UI 컴포넌트를 즉시 사용할 수 있습니다.",
    example: "ui-components-demo",
  },
  developer: {
    content:
      "이 스타터킷은 명확한 폴더 구조, 재사용 가능한 컴포넌트, 타입 정의 등으로 개발자 경험을 최우선으로 설계되었습니다. 바퀴를 재발명하지 않고 검증된 라이브러리를 활용합니다.",
    example: "developer-demo",
  },
}

type FeatureSlug = keyof typeof featureExamples

interface Props {
  params: Promise<{
    slug: string
  }>
}

// 정적 경로 생성
export function generateStaticParams() {
  return Object.keys(featureExamples).map((slug) => ({
    slug,
  }))
}

// SEO 메타데이터
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const config = getFeatureConfig(slug)

  if (!config) {
    return { title: "기능을 찾을 수 없습니다" }
  }

  return {
    title: config.title,
    description: config.description,
  }
}

// 예제 컴포넌트 매핑 — 함수로 래핑하여 해당 슬러그 방문 시에만 평가
const ExampleComponents: Record<string, () => React.ReactNode> = {
  "skeleton-demo": () => (
    <div className="space-y-3">
      <div className="h-8 rounded-lg bg-muted animate-pulse" />
      <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
    </div>
  ),
  "theme-demo": () => (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { name: "Primary", color: "bg-primary" },
        { name: "Secondary", color: "bg-secondary" },
        { name: "Accent", color: "bg-accent" },
        { name: "Muted", color: "bg-muted" },
      ].map((item) => (
        <div key={item.name} className="flex items-center gap-4">
          <div className={`size-16 rounded-lg ${item.color}`} />
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-muted-foreground">Dark/Light에서 자동 변환</p>
          </div>
        </div>
      ))}
    </div>
  ),
  "responsive-demo": () => <ResponsiveDemo />,
  "typescript-demo": () => (
    <div className="space-y-3 font-mono text-sm">
      <p className="text-blue-600 dark:text-blue-400">
        <span className="text-foreground">{"interface"}</span>{" "}
        <span className="font-semibold">Feature</span> {"{"}
      </p>
      <p className="ml-4 text-green-600 dark:text-green-400">
        {"icon: "}
        <span className="text-orange-600 dark:text-orange-400">string</span>
      </p>
      <p className="ml-4 text-green-600 dark:text-green-400">
        {"title: "}
        <span className="text-orange-600 dark:text-orange-400">string</span>
      </p>
      <p className="ml-4 text-green-600 dark:text-green-400">
        {"description: "}
        <span className="text-orange-600 dark:text-orange-400">string</span>
      </p>
      <p className="text-foreground">{"}"}</p>
    </div>
  ),
  "datatable-demo": () => (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted">
            <th className="px-4 py-3 text-left text-sm font-semibold">이름</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">상태</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">금액</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "홍길동", status: "활성", amount: "₩5,000" },
            { name: "김영희", status: "활성", amount: "₩3,000" },
            { name: "이순신", status: "비활성", amount: "₩2,000" },
          ].map((row) => (
            <tr key={row.name} className="border-b border-border">
              <td className="px-4 py-3 text-sm">{row.name}</td>
              <td className="px-4 py-3 text-sm">{row.status}</td>
              <td className="px-4 py-3 text-sm">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  "ui-components-demo": () => (
    <div className="space-y-8">
      {/* 버튼 갤러리 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">버튼 변형</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* 배지 갤러리 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">배지 스타일</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      {/* 카드 갤러리 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">카드 컴포넌트</p>
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>카드 내용이 들어갑니다</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Another Card</CardTitle>
            </CardHeader>
            <CardContent>다양한 카드 변형을 만들 수 있습니다</CardContent>
          </Card>
        </div>
      </div>

      {/* Progress 갤러리 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">Progress Bar</p>
        <div className="space-y-2">
          <div className="w-full h-2 rounded-full bg-muted">
            <div className="h-full w-2/3 bg-primary rounded-full" />
          </div>
          <div className="w-full h-2 rounded-full bg-muted">
            <div className="h-full w-1/3 bg-accent rounded-full" />
          </div>
        </div>
      </div>

      {/* Separator */}
      <Separator />
      <p className="text-xs text-muted-foreground">
        총 32개의 ShadcnUI 컴포넌트가 설치되어 있습니다. src/components/ui/ 를 참고하세요.
      </p>
    </div>
  ),
  "developer-demo": () => (
    <div className="space-y-3">
      <Badge>📁 src/config/site.ts</Badge>
      <p className="text-sm text-muted-foreground">
        모든 사이트 설정을 한 곳에서 관리합니다
      </p>
      <Badge>🎨 src/components</Badge>
      <p className="text-sm text-muted-foreground">
        재사용 가능한 컴포넌트들이 계층별로 정리되어 있습니다
      </p>
    </div>
  ),
}

// 기능 예제 페이지
export default async function FeaturePage({ params }: Props) {
  const { slug } = await params
  const feature = featureExamples[slug as FeatureSlug]
  const config = getFeatureConfig(slug)

  if (!feature || !config) {
    notFound()
  }

  return (
    <>
      {/* 뒤로가기 버튼 */}
      <div className="mb-8 border-b border-border/40">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            돌아가기
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        {/* 페이지 헤더 */}
        <PageHeader
          title={config.title}
          description={config.description}
        />

        {/* 설명 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>개요</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{feature.content}</p>
          </CardContent>
        </Card>

        {/* 예제 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>라이브 예제</CardTitle>
            <CardDescription>
              아래 예제를 통해 실제 동작을 확인할 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ExampleComponents[feature.example]?.() ?? (
              <p className="text-muted-foreground">예제를 준비 중입니다</p>
            )}
          </CardContent>
        </Card>

        {/* 다음 단계 */}
        <Card>
          <CardHeader>
            <CardTitle>다음 단계</CardTitle>
            <CardDescription>
              이 기능을 자신의 프로젝트에 어떻게 활용할지 알아보세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              이 스타터킷의 소스 코드를 참고하여 자신의 프로젝트에 맞게 커스터마이징할 수 있습니다.
            </p>
            <Button asChild>
              <Link href="/dashboard">대시보드 보기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
