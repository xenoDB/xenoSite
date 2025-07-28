import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const positions: Record<string, number> = {};

export default function useScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Restore scroll
    window.scrollTo(0, positions[pathname] || 0);

    return () => {
      // Save scroll
      positions[pathname] = window.scrollY;
    };
  }, [pathname]);
}
