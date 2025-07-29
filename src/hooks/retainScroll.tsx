import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const positions: Record<string, number> = {};

export default function useScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, positions[pathname] || 0);
    return () => {
      positions[pathname] = window.scrollY;
    };
  }, [pathname]);
}
