// 사이트 전체 상수 설정 — 단일 수정 지점
export const siteConfig = {
  name: "ModernStarter",
  description: "Next.js 16 + Tailwind CSS + ShadcnUI 기반 모던 웹 스타터킷",
  url: "https://example.com",

  // 네비게이션
  nav: [
    { label: "홈", href: "/" },
    { label: "예제", href: "/features" },
    { label: "대시보드", href: "/dashboard" },
  ],

  // 푸터
  footer: {
    links: [
      { label: "홈", href: "/" },
      { label: "대시보드", href: "/dashboard" },
      { label: "GitHub", href: "https://github.com" },
    ],
    copyright: "© 2026 ModernStarter. 모든 권리 보유.",
  },

  // 히어로 섹션
  hero: {
    badge: "✨ 새로운 스타터킷",
    title: "최신 웹 개발 스택으로 빠르게 시작하세요",
    description:
      "Next.js 16, React 19, Tailwind CSS v4, ShadcnUI를 활용한 프로덕션 레디 스타터킷입니다.",
    ctaPrimary: { label: "지금 시작하기", href: "#features" },
    ctaSecondary: { label: "문서 보기", href: "https://github.com" },
  },

  // 기능 섹션
  features: [
    {
      icon: "Zap",
      title: "번개 같은 속도",
      description: "Next.js 15의 App Router와 최적화된 렌더링으로 빠른 성능을 제공합니다.",
      href: "/features/performance",
    },
    {
      icon: "Palette",
      title: "다크모드 지원",
      description: "next-themes를 활용한 완벽한 다크/라이트 모드 전환 기능을 갖추고 있습니다.",
      href: "/features/theme",
    },
    {
      icon: "Layout",
      title: "반응형 디자인",
      description: "모바일부터 데스크탑까지 모든 화면 크기에서 완벽하게 동작합니다.",
      href: "/features/responsive",
    },
    {
      icon: "Code",
      title: "TypeScript",
      description: "완벽한 TypeScript 지원으로 개발 경험과 타입 안정성을 높입니다.",
      href: "/features/typescript",
    },
    {
      icon: "BarChart",
      title: "데이터 테이블",
      description: "TanStack Table을 활용한 강력한 데이터 테이블 컴포넌트를 제공합니다.",
      href: "/features/data-table",
    },
    {
      icon: "Layers",
      title: "UI 컴포넌트",
      description: "ShadcnUI 기반의 32개 UI 컴포넌트로 빠르게 인터페이스를 구축할 수 있습니다.",
      href: "/features/ui-components",
    },
    {
      icon: "Smile",
      title: "개발자 친화",
      description: "명확한 폴더 구조와 예시 코드로 빠르게 프로젝트를 확장할 수 있습니다.",
      href: "/features/developer",
    },
  ],

  // CTA 섹션
  cta: {
    title: "지금 바로 시작해보세요",
    description: "이 스타터킷을 기반으로 당신의 다음 프로젝트를 만들어보세요.",
    button: { label: "대시보드 보기", href: "/dashboard" },
  },
}
