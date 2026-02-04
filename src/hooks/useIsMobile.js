import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const get = () =>
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${breakpoint}px)`).matches;

  const [isMobile, setIsMobile] = useState(get);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = e => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener?.("change", onChange);
    mql.addListener?.(onChange); // Safari fallback
    return () => {
      mql.removeEventListener?.("change", onChange);
      mql.removeListener?.(onChange);
    };
  }, [breakpoint]);

  return isMobile;
}
