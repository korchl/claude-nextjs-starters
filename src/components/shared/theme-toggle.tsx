"use client"

import { useTheme } from "next-themes"
import { useIsClient } from "usehooks-ts"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

// 다크/라이트/시스템 테마 토글 버튼
// useIsClient()로 SSR hydration mismatch 방지
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isClient = useIsClient()

  if (!isClient) return null

  const handleThemeChange = () => {
    const themes = ["light", "dark", "system"]
    const currentIndex = themes.indexOf(theme || "system")
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      className="relative"
      aria-label="테마 전환"
    >
      {theme === "light" && <Sun className="size-4" />}
      {theme === "dark" && <Moon className="size-4" />}
      {theme === "system" && <Monitor className="size-4" />}
    </Button>
  )
}
