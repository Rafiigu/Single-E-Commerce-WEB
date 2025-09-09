"use client";

import { AppSidebar } from "@/components/shared/app-sidebar";
import { RedirectIfNotAuthenticated } from "@/components/shared/redirect-if-not-authenticated";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <RedirectIfNotAuthenticated>
      <SidebarProvider>
        <AppSidebar />
        <main>{children}</main>
      </SidebarProvider>
    </RedirectIfNotAuthenticated>
  );
};

export default AppLayout;
