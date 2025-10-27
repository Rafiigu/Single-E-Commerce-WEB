"use client";

import { AdminAccount } from "@/types";
import { createContext, ReactNode, useContext } from "react";

type AuthContextType = {
  account: AdminAccount | null;
};

const AuthContext = createContext<AuthContextType>({
  account: null,
});

export const AuthProvider = ({
  account,
  children,
}: {
  account: AdminAccount | null;
  children: ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ account }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
