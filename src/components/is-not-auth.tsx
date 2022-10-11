import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
const IsNotAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return !auth.user ? <Outlet /> : <Navigate to="/home" state={{ from: location }} replace />;
};

export default IsNotAuth;
