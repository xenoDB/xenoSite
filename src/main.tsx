import "./index.css";
import { StrictMode } from "react";
import Contents from "./pages/Home.tsx";
import Footer from "./components/Footer.tsx";
import { createRoot } from "react-dom/client";
import Navigation from "./components/Navbar.tsx";
import ServerSetup from "./pages/ServerSetup.tsx";
import StorageLayout from "./pages/StorageLayout.tsx";
import DatabaseMethods from "./pages/DatabaseMethods.tsx";
import ClientImplementation from "./pages/ClientImplementation.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Contents />,
      },
      {
        path: "/server-setup",
        element: <ServerSetup />,
      },
      {
        path: "/client-implementation",
        element: <ClientImplementation />,
      },
      {
        path: "/database-methods",
        element: <DatabaseMethods />,
      },
      {
        path: "/storage-layout",
        element: <StorageLayout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
