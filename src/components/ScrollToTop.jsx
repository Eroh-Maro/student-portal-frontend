import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop({ behavior = "auto" }) {
  const { pathname, hash, search } = useLocation();
  const navType = useNavigationType(); // 'PUSH' | 'REPLACE' | 'POP'

  useEffect(() => {
    // Always scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []); // <-- runs once on mount (covers refresh)

  useEffect(() => {
    // Prevent scrolling for hash anchors (e.g. /#section)
    if (hash) return;

    // Keep scroll on back/forward navigation
    if (navType === "POP") return;

    // Scroll to top on normal navigation
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, search, hash, navType, behavior]);

  return null;
}
