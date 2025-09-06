"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
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

  return <main className="flex w-full min-h-screen">{children}</main>;
};

export default AppLayout;
