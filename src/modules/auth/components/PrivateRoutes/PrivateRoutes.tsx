import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { useAuthContext } from "@/modules/auth/contexts";
import { BookmarksProvider } from "@/modules/bookmarks/contexts";
import { Header } from "@/modules/shared/components";

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
