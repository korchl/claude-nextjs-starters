import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Separator } from "@/components/ui/separator"

// 푸터 컴포넌트
export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium">{siteConfig.name}</p>
            <p className="text-xs text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex gap-6">
            {siteConfig.footer.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-sm transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <p className="text-xs text-muted-foreground">
          {siteConfig.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
