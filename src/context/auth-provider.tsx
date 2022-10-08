import React, { createContext, useState } from "react";

type AuthContextProps = {
  children: React.ReactNode;
};

type User = {
  id: string;
  username: string;
  fullName: {
    firstName: string;
    lastName: String;
  };
  email: string;
  picture: string;
  thumbnail: string;
  accessToken: string;
};

const AuthContext = createContext<{ auth: { user: User | null }; setAuth: React.Dispatch<React.SetStateAction<{ user: User | null }>> }>({
  auth: { user: null },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [auth, setAuth] = useState<{ user: User | null }>({ user: null });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
