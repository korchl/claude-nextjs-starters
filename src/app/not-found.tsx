import Link from "next/link"
import { Button } from "@/components/ui/button"

// 404 페이지
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          페이지를 찾을 수 없습니다
        </p>
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  )
}
