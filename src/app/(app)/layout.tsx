"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
};

export default AppLayout;
