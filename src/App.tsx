import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { AppLayout } from "@/layouts/AppLayout";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { HomePage } from "@/pages/HomePage";
import { PrivateRoutes } from "@/utils/routes";

import "./App.css";

const router = createMemoryRouter([
  {
    element: <AppLayout />,
    // loader: rootLoader,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: "/",
        // index: true
        element: <PrivateRoutes />,
        children: [{ path: "/", element: <HomePage /> }],
        // loader: teamLoader,
      },
      // { path: "*", element: <div>404</div> },
      {
        path: "/login",
        element: <LoginPage />,
        // loader: teamLoader,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        // loader: teamLoader,
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
