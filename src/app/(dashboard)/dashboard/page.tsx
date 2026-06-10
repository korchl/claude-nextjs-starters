"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

// 샘플 데이터 타입
interface SampleData {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  amount: number
}

// 샘플 데이터
const sampleData: SampleData[] = [
  { id: "1", name: "홍길동", email: "hong@example.com", status: "active", amount: 5000 },
  { id: "2", name: "김영희", email: "kim@example.com", status: "active", amount: 3000 },
  { id: "3", name: "이순신", email: "lee@example.com", status: "inactive", amount: 2000 },
  { id: "4", name: "박지성", email: "park@example.com", status: "active", amount: 7000 },
  { id: "5", name: "최민수", email: "choi@example.com", status: "active", amount: 4500 },
]

// 테이블 컬럼 정의
const columns: ColumnDef<SampleData>[] = [
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "email",
    header: "이메일",
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
          }`}
        >
          {status === "active" ? "활성" : "비활성"}
        </span>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "금액",
    cell: ({ row }) => {
      return `₩${row.original.amount.toLocaleString()}`
    },
  },
]

// 통계 카드 컴포넌트
interface StatCardProps {
  title: string
  value: string
  change?: { value: number; isPositive: boolean }
}

function StatCard({ title, value, change }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs ${
              change.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            <ArrowUpRight className="mr-1 inline-block size-3" />
            {change.value > 0 ? "+" : ""}{change.value}% 지난달 대비
          </p>
        )}
      </CardContent>
    </Card>
  )
}

// 대시보드 페이지
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <PageHeader
        title="대시보드"
        description="비즈니스 현황을 한눈에 파악하세요"
      >
        <Button>새로운 항목</Button>
      </PageHeader>

      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="총 수익"
          value="₩21,500"
          change={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="활성 사용자"
          value="4명"
          change={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="총 주문"
          value="5건"
          change={{ value: -3, isPositive: false }}
        />
        <StatCard
          title="전환율"
          value="24.5%"
          change={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* 데이터 테이블 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">최근 고객</h2>
          <p className="text-sm text-muted-foreground">
            가장 최근의 고객 정보를 표시합니다. 검색하거나 정렬할 수 있습니다.
          </p>
        </div>
        <DataTable
          columns={columns}
          data={sampleData}
          searchKey="name"
          pageSize={5}
        />
      </div>
    </div>
  )
}
