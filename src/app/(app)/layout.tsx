"use client";

import { AppSidebar } from "@/components/shared/app-sidebar";
import { RedirectIfNotAuthenticated } from "@/components/shared/redirect-if-not-authenticated";
import { RedirectIfPasswordUnchanged } from "@/components/shared/redirect-if-password-unchanged";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <RedirectIfNotAuthenticated>
      <RedirectIfPasswordUnchanged>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">{children}</main>
        </SidebarProvider>
      </RedirectIfPasswordUnchanged>
    </RedirectIfNotAuthenticated>
  );
};

export default AppLayout;
