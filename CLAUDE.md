# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

테스트 러너는 없음. 브라우저 검증은 Playwright MCP(`mcp__playwright__*`)를 사용한다.

## 아키텍처

### 라우트 그룹 구조

두 개의 독립적인 레이아웃 그룹으로 분리되어 있다.

```
src/app/
├── (marketing)/          # Header + Footer 레이아웃
│   ├── page.tsx          # 홈 (/)
│   └── features/
│       ├── page.tsx      # 예제 목록 (/features)
│       └── [slug]/       # 예제 상세 (/features/[slug])
└── (dashboard)/          # SidebarProvider + DashboardHeader 레이아웃
    └── dashboard/
        ├── page.tsx
        ├── analytics/
        └── settings/
```

- `(marketing)` 레이아웃: `Header` + `Footer`
- `(dashboard)` 레이아웃: `SidebarProvider` → `AppSidebar` + `SidebarInset` → `DashboardHeader`
- 루트 레이아웃(`src/app/layout.tsx`): `ThemeProvider` → `QueryProvider` → `TooltipProvider` 순으로 래핑

### 컴포넌트 계층

```
src/components/
├── ui/          # shadcn/ui 원시 컴포넌트 (직접 수정 금지)
├── layout/      # Header, Footer, AppSidebar, DashboardHeader, MobileMenu
├── sections/    # 마케팅 페이지 섹션 (HeroSection, FeaturesSection, CTASection)
├── shared/      # 재사용 컴포넌트 (PageHeader, DataTable, ThemeToggle 등)
├── demos/       # 예제 페이지용 인터랙티브 Client Component
└── providers/   # ThemeProvider, QueryProvider
```

### 중앙 설정 파일

**`src/config/site.ts`** — 네비게이션 항목, 기능 목록, 히어로/CTA 문구 등 사이트 전체 콘텐츠의 단일 수정 지점이다. 헤더 nav 추가, 기능 카드 추가 등은 이 파일만 수정한다.

타입 정의는 `src/types/index.ts`에 있다 (`SiteConfig`, `NavItem`, `Feature`).

### 예제 페이지 패턴 (`/features/[slug]`)

`src/app/(marketing)/features/[slug]/page.tsx`는 Server Component다.
- `featureExamples` 객체가 slug → 메타데이터를 매핑
- `ExampleComponents` 객체가 slug → 렌더링할 JSX를 매핑
- 인터랙션이 필요한 예제는 `src/components/demos/`에 `"use client"` 컴포넌트로 분리한 뒤 `ExampleComponents`에서 import해 사용한다
- 새 예제 슬러그를 추가할 때 `featureExamples`, `ExampleComponents`, `generateStaticParams`, `src/config/site.ts`의 `features` 배열 모두 업데이트해야 한다

### DataTable

`src/components/shared/data-table.tsx`는 TanStack Table 기반 Client Component다. 정렬·필터링·페이지네이션이 내장되어 있으며 제네릭 `<T>`로 타입 안전하게 사용한다. `searchKey`로 검색 필드를 지정하고 `pageSize`로 페이지당 행 수를 설정한다.

### 반응형 브레이크포인트

프로젝트 전반에서 `md(768px)`와 `lg(1024px)`를 주 기준으로 사용한다. `useIsMobile()` 훅(`src/hooks/use-mobile.ts`)은 768px 미만을 모바일로 판단한다.

### 아이콘

`src/components/sections/features-section.tsx`의 `iconMap`에 lucide-react 아이콘을 등록해야 `siteConfig.features`의 `icon` 문자열이 실제 컴포넌트로 렌더링된다. 새 기능 카드에 아이콘을 추가할 때 이 파일도 함께 수정한다.

## 기술 스택 주요 사항

- **Next.js 16 App Router** — React Compiler(`reactCompiler: true`) 활성화
- **Tailwind CSS v4** — `tailwind.config.ts` 없음, `@import "tailwindcss"`로 직접 import
- **shadcn/ui** — `src/components/ui/`에 설치됨. 새 컴포넌트 추가: `npx shadcn@latest add <component>`
- **경로 별칭** — `@/*` → `src/*`
