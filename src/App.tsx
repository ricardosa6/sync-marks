import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { AppLayout } from "@/layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";

import { PrivateRoutes } from "@/utils/routes";

import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Settings from "./pages/Settings";

import "./App.css";
import Login from "./pages/Login/Login";

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
            element: <Home />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        path: "/auth",
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
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
