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
import {
  Blocks,
  CreditCard,
  LogOut,
  Package,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import { useAuth } from "../providers/auth-provider";
import { ROLE_MAP } from "../constants";
import { AdminRole } from "@/types";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth/logout";

const groups = [
  {
    title: "Akun",
    accesses: ["superadmin", "admin"],
    items: [
      {
        title: "Manajemen Admin",
        url: "/account/admin",
        icon: UsersRound,
        accesses: ["superadmin"],
      },
      {
        title: "Manajemen User",
        url: "/account/user",
        icon: UserRoundSearch,
        accesses: ["superadmin", "admin"],
      },
    ],
  },
  {
    title: "Produk",
    accesses: ["superadmin", "admin"],
    items: [
      {
        title: "Manajemen Kategori",
        url: "/product-category",
        icon: Blocks,
        accesses: ["superadmin"],
      },
      {
        title: "Manajemen Produk",
        url: "/product",
        icon: Package,
        accesses: ["superadmin", "admin"],
      },
    ],
  },
  {
    title: "Transaksi",
    accesses: ["superadmin", "admin"],
    items: [
      {
        title: "Manajemen Tipe Pembayaran",
        url: "/payment-term",
        icon: CreditCard,
        accesses: ["superadmin"],
      },
    ],
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
          {groups.map((group, i) => {
            if (group.accesses.includes(account?.role as string)) {
              return (
                <div key={`#group-${i}`}>
                  <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item, j) => {
                        if (item.accesses.includes(account?.role as string)) {
                          return (
                            <SidebarMenuItem key={`#group-${i}-item-${j}`}>
                              <SidebarMenuButton asChild>
                                <a href={item.url}>
                                  <item.icon />
                                  <span>{item.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        }

                        return null;
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </div>
              );
            }

            return null;
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row justify-between px-2">
          <div className="flex flex-col">
            <p className="text-sm text-neutral-700 font-medium">
              {account?.name}
            </p>
            <p className="text-xs text-neutral-500">
              {ROLE_MAP[account?.role as AdminRole]}
            </p>
          </div>
          <Button
            className="size-9"
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
