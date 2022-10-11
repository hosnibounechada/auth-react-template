import { useEffect } from "react";
import socket from "../services/socket";
import useAuth from "./use-auth";

const useSocketSetup = () => {
  const { setAuth } = useAuth();
  useEffect(() => {
    socket.connect();
    socket.on("connect-error", () => {
      setAuth({ user: null });
    });
    return () => {
      socket.off("connect-error");
    };
  }, [setAuth]);
};

export default useSocketSetup;
