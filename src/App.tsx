import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { AppLayout } from "@/layouts/AppLayout";

import { PrivateRoutes } from "@/utils/routes";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Settings from "./pages/Settings";

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
      // { path: "*", element: <div>404</div> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
