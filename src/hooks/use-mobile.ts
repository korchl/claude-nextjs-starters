import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    mql.addEventListener("change", onChange)
    // 초기값 설정 — 이벤트 핸들러를 통해 호출하여 동기적 setState 경고 회피
    onChange()
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
