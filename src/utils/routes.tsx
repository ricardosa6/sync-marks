import { useAuthContext } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const auth = useAuthContext();

  return auth?.currentUser ? <Outlet /> : <Navigate to="/login" />;
};
