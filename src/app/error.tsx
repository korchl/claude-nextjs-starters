"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

// 에러 바운더리
interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold">⚠️</h1>
        <p className="mb-2 text-xl font-semibold">문제가 발생했습니다</p>
        <p className="mb-6 text-muted-foreground">
          {error.message || "예상치 못한 오류가 발생했습니다"}
        </p>
        <Button onClick={() => reset()}>다시 시도</Button>
      </div>
    </div>
  )
}
