import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/page-header"
import { TrendingUp } from "lucide-react"

// 분석 통계 항목
interface AnalyticsStat {
  title: string
  value: string
  change: { value: number; isPositive: boolean }
  description: string
}

const analytics: AnalyticsStat[] = [
  {
    title: "월간 방문자",
    value: "12,543",
    change: { value: 23, isPositive: true },
    description: "지난달 대비 증가 추세",
  },
  {
    title: "평균 세션 시간",
    value: "4분 32초",
    change: { value: 12, isPositive: true },
    description: "사용자 참여도 향상",
  },
  {
    title: "페이지 뷰",
    value: "45,231",
    change: { value: 5, isPositive: false },
    description: "지난주 대비 변화",
  },
  {
    title: "이탈률",
    value: "32.5%",
    change: { value: 8, isPositive: false },
    description: "개선 필요 지표",
  },
]

// 통계 카드 컴포넌트
function StatCard({ stat }: { stat: AnalyticsStat }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <CardDescription>{stat.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">{stat.value}</div>
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${
              stat.change.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp className="size-3" />
            {stat.change.value > 0 ? "+" : ""}{stat.change.value}%
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 분석 페이지
export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="분석"
        description="주요 지표와 트렌드를 확인하세요"
      />

      {/* 통계 그리드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analytics.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* 추가 정보 카드 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>트래픽 소스</CardTitle>
            <CardDescription>가장 많은 방문자가 유입되는 채널</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { source: "직접 방문", percent: 35 },
                { source: "검색 엔진", percent: 28 },
                { source: "소셜 미디어", percent: 22 },
                { source: "레퍼럴", percent: 15 },
              ].map((item) => (
                <div key={item.source}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{item.source}</span>
                    <span className="font-semibold">{item.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>상위 페이지</CardTitle>
            <CardDescription>가장 많이 방문한 페이지</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { page: "홈", views: 4523 },
                { page: "기능 소개", views: 3421 },
                { page: "대시보드", views: 2891 },
                { page: "가격 정보", views: 1245 },
              ].map((item) => (
                <div
                  key={item.page}
                  className="flex justify-between border-b border-border/50 pb-2 last:border-0"
                >
                  <span className="text-sm">{item.page}</span>
                  <span className="font-semibold">{item.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
