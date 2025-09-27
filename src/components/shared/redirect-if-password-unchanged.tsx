"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../providers/auth-provider";

type Props = {
  children: ReactNode;
};

export const RedirectIfPasswordUnchanged = ({ children }: Props) => {
  const router = useRouter();

  const { account } = useAuth();

  useEffect(() => {
    if (account && !account.isPasswordChanged) {
      router.replace("/update-password");
    }
  }, [router, account]);

  if (!account || (account && !account.isPasswordChanged)) {
    return null;
  }

  return children;
};
