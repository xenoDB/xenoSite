import { useLocation, useNavigate } from "react-router-dom";

const PageNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show on home page
  if (location.pathname === "/") {
    return null;
  }

  // Define the page order
  const pages = [
    { path: "/", title: "Home" },
    { path: "/server-setup", title: "Server Setup" },
    { path: "/client-implementation", title: "Client Implementation" },
    { path: "/database-methods", title: "Database Methods" },
    { path: "/storage-layout", title: "Storage Layout" },
  ];

  const currentIndex = pages.findIndex(
    (page) => page.path === location.pathname
  );
  const previousPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end items-center space-x-4 text-sm">
        {/* Previous Page */}
        {previousPage && (
          <>
            <button
              onClick={() => navigate(previousPage.path)}
              className="text-slate-800 hover:text-purple-600 transition-colors"
            >
              ← {previousPage.title}
            </button>
            <span className="text-slate-800">|</span>
          </>
        )}

        {previousPage?.path === "/" ? null : (
          <button
            onClick={() => navigate("/")}
            className="text-slate-800 hover:text-purple-600 transition-colors"
          >
            Home
          </button>
        )}

        {/* Next Page */}
        {nextPage && (
          <>
            {previousPage?.path === "/" ? null : (
              <span className="text-slate-800">|</span>
            )}
            <button
              onClick={() => navigate(nextPage.path)}
              className="text-slate-800 hover:text-purple-600 transition-colors"
            >
              {nextPage.title} →
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PageNavigation;
