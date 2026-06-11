"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState } from "react"

// TanStack Query의 QueryClientProvider를 래핑하는 클라이언트 컴포넌트
// 서버 상태와 비동기 데이터 패칭 관리용
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState로 인스턴스별 QueryClient 생성 — 모듈 싱글턴 사용 시 SSR 요청 간 상태 오염 위험
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5분
            gcTime: 1000 * 60 * 10, // 10분
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
