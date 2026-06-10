import Link from "next/link"
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { MobileMenu } from "@/components/layout/mobile-menu"

// 마케팅 페이지 헤더
// 데스크탑: 로고 + 네비 + 테마토글
// 모바일: 로고 + 테마토글 + 햄버거 메뉴
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-14 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-bold md:mr-8">
          {siteConfig.name}
        </Link>

        {/* 데스크탑 네비 */}
        <div className="hidden gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* 테마토글 + 모바일메뉴 */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu nav={siteConfig.nav} />
        </div>
      </nav>
    </header>
  )
}
