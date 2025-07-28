import { useEffect, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button onClick={scrollToTop} className="fixed lg:bottom-10 lg:right-1">
      <div className="w-10 h-10 bg-transparent flex items-center justify-center">
        <FaAngleDoubleUp className="w-6 h-6 text-slate-600" />
      </div>
    </button>
  ) : null;
}
