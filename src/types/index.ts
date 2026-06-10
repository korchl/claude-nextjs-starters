// 공통 TypeScript 타입 정의

export interface NavItem {
  label: string
  href: string
}

export interface Feature {
  icon: string
  title: string
  description: string
  href: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  nav: NavItem[]
  footer: {
    links: NavItem[]
    copyright: string
  }
  hero: {
    badge: string
    title: string
    description: string
    ctaPrimary: NavItem
    ctaSecondary: NavItem
  }
  features: Feature[]
  cta: {
    title: string
    description: string
    button: NavItem
  }
}
