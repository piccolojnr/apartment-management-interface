import React, { createContext, useContext } from "react";
import useAuth from "@/hooks/use-auth";
import { User } from "@/types/user";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: any;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
