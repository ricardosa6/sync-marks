import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { useAuthContext } from "@/contexts/AuthContext";
import { BookmarksProvider } from "@/contexts/BookmarksContext";
import { Header } from "@/components/Header";

export const PrivateRoutes = () => {
  const auth = useAuthContext();

  if (auth?.loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner aria-label="Loading..." size="xl" />
      </div>
    );
  }

  return auth?.currentUser ? (
    <BookmarksProvider>
      <Header />
      <Outlet />
    </BookmarksProvider>
  ) : (
    <Navigate to="/auth/login" />
  );
};
