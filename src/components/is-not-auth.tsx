import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import socket from "../services/socket";
const IsNotAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.user) socket.disconnect();

  return !auth.user ? <Outlet /> : <Navigate to="/home" state={{ from: location }} replace />;
};

export default IsNotAuth;
