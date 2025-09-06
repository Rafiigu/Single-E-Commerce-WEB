"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut, UsersRound } from "lucide-react";
import { useAuth } from "../providers/auth-provider";
import { ROLE_MAP } from "../constants";
import { Role } from "@/types";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth/logout";

const items = [
  {
    title: "Manajemen Akun",
    url: "#",
    icon: UsersRound,
  },
];

export function AppSidebar() {
  const { account } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="px-2 font-medium text-neutral-700">E-Commerce Admin</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Master Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row justify-between px-2">
          <div className="flex flex-col">
            <p className="text-sm text-neutral-700 font-medium">
              {account?.name}
            </p>
            <p className="text-xs text-neutral-500">
              {ROLE_MAP[account?.role as Role]}
            </p>
          </div>
          <Button
            className="h-10"
            onClick={async () => {
              await logout();
            }}
          >
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
