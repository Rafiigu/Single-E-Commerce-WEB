"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../providers/auth-provider";

type Props = {
  children: ReactNode;
};

export const RedirectIfNotAuthenticated = ({ children }: Props) => {
  const router = useRouter();

  const { account } = useAuth();
  console.log(account);

  useEffect(() => {
    if (!account) {
      router.replace("/login");
    }
  }, [router, account]);

  if (!account) {
    return null;
  }

  return children;
};
