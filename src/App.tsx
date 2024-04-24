import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { AppLayout } from "@/layouts/AppLayout";

import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { HomePage } from "@/pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";

import { PrivateRoutes } from "@/utils/routes";

import "./App.css";

const router = createMemoryRouter([
  {
    element: <AppLayout />,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: "/",
        element: <PrivateRoutes />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
      // { path: "*", element: <div>404</div> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<Spinner aria-label="Loading..." />}
    />
  );
}

export default App;
