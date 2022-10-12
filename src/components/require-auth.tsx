import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import useSocketSetup from "../hooks/use-socket-setup";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  useSocketSetup();

  return auth.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
