"use client";

import { Account } from "@/types";
import { createContext, ReactNode, useContext } from "react";

type AuthContextType = {
  account: Account | null;
};

const AuthContext = createContext<AuthContextType>({
  account: null,
});

export const AuthProvider = ({
  account,
  children,
}: {
  account: Account | null;
  children: ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ account }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
