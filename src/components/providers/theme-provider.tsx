"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

// next-themes의 ThemeProvider를 래핑하는 클라이언트 컴포넌트
// Root layout에서 사용하여 다크모드 토글 기능 제공
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
