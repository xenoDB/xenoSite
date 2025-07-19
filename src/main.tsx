import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Contents from "./components/pages/Home.tsx";
import Footer from "./components/layout/Footer.tsx";
import Navigation from "./components/layout/Navbar.tsx";
import ServerSetup from "./components/pages/ServerSetup.tsx";
import StorageLayout from "./components/pages/StorageLayout.tsx";
import DatabaseMethods from "./components/pages/DatabaseMethods.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ClientImplementation from "./components/pages/ClientImplementation.tsx";

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
