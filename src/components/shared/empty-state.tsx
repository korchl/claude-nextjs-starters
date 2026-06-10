import { AlertCircle } from "lucide-react"

// 빈 상태 표시 컴포넌트
// 데이터 없을 때, 검색 결과 없을 때 등에 사용
interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title = "데이터가 없습니다",
  description = "표시할 항목이 없습니다",
  icon = <AlertCircle className="size-12 text-muted-foreground" />,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
