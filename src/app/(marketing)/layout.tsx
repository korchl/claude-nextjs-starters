import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// 마케팅 페이지 레이아웃 (Header + Footer)
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
