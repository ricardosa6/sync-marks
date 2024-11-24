import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "@/modules/shared/layouts";
import { AuthLayout } from "@/modules/auth/layouts";
import { PrivateRoutes } from "@/modules/auth/components";

import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Settings from "@/pages/Settings";

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
  return <RouterProvider router={router} />;
}

export default App;
