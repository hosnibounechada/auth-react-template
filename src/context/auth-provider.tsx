import React, { createContext, useState } from "react";
import { User } from "../types/auth";

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<{
  auth: { user: User | null };
  setAuth: React.Dispatch<React.SetStateAction<{ user: User | null }>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  auth: { user: null },
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [auth, setAuth] = useState<{ user: User | null }>({ user: null });
  const [persist, setPersist] = useState<boolean>(localStorage.getItem("persist") === "true" ? true : false);

  return <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
