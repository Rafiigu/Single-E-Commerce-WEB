"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../providers/auth-provider";

type Props = {
  children: ReactNode;
};

export const RedirectIfAuthenticated = ({ children }: Props) => {
  const router = useRouter();

  const { account } = useAuth();

  useEffect(() => {
    if (account) {
      router.replace("/");
    }
  }, [router, account]);

  if (account) {
    return null;
  }

  return children;
};
