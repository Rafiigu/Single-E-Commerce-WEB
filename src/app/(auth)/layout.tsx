"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
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

  return (
    <main className="flex w-full min-h-screen justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
