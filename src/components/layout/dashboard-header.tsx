import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { UserNav } from "@/components/shared/user-nav"
import { House } from "lucide-react"

// 대시보드 상단 바
export function DashboardHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border/40 px-4 md:px-6 lg:px-8">
      <Button variant="ghost" asChild size="sm">
        <Link href="/">
          <House className="mr-2 size-4" />
          홈
        </Link>
      </Button>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  )
}
