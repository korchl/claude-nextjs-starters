"use client"

import { useBoolean } from "usehooks-ts"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileMenuProps {
  nav: Array<{ label: string; href: string }>
}

// 모바일 뷰에서 Sheet 기반 햄버거 메뉴
// useBoolean()로 Sheet 열림/닫힘 상태 관리
export function MobileMenu({ nav }: MobileMenuProps) {
  const { value: open, setFalse: close } = useBoolean(false)

  return (
    <Sheet open={open} onOpenChange={(newOpen) => newOpen ? null : close()}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">메뉴</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <nav className="flex flex-col gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
