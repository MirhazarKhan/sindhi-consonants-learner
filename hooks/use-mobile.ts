import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(() => {
      // Lazy initialization ensures this only runs once on the client
      if (typeof window !== 'undefined') {
          return window.innerWidth < MOBILE_BREAKPOINT;
      }
      return undefined;
  });

  React.useEffect(() => {
    let isMounted = true;
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      if (isMounted) {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }
    
    try {
        mql.addEventListener("change", onChange)
    } catch {
        mql.addListener(onChange)
    }
    
    return () => {
        isMounted = false;
        try {
            mql.removeEventListener("change", onChange)
        } catch {
            mql.removeListener(onChange)
        }
    }
  }, [])

  return !!isMobile
}
