"use client"

import { useLocalStorage } from "usehooks-ts"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, BarChart3, Settings, LogOut, House } from "lucide-react"
import Link from "next/link"

// ShadcnUI Sidebar 기반 애플리케이션 사이드바
// useLocalStorage()로 접힘 상태 유지
export function AppSidebar() {
  const [collapsed, setCollapsed] = useLocalStorage("sidebar-collapsed", false)

  const navItems = [
    { icon: House, label: "홈", href: "/" },
    { icon: Home, label: "대시보드", href: "/dashboard" },
    { icon: BarChart3, label: "분석", href: "/dashboard/analytics" },
    { icon: Settings, label: "설정", href: "/dashboard/settings" },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            MD
          </div>
          <span className="hidden group-data-[state=expanded]:inline">ModernStarter</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="size-4" />
              <span>로그아웃</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
