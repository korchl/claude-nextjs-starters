"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

// TanStack Query의 QueryClientProvider를 래핑하는 클라이언트 컴포넌트
// 서버 상태와 비동기 데이터 패칭 관리용
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분
    },
  },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
