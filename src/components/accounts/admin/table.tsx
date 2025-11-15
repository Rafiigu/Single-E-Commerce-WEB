"use client";

import { Table } from "@/components/shared/table";
import { Badge, BadgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AdminAccount } from "@/types";
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  accounts: AdminAccount[];
  page: number;
  total: number;
};

export const AdminAccountTable = ({ accounts, page, total }: Props) => {
  return (
    <Table
      data={accounts}
      page={page}
      total={total}
      headers={{
        name: "Nama Lengkap",
        role: "Role",
        email: "Email",
        status: "Status",
      }}
      render={{
        name(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        role(val) {
          const map = {
            superadmin: "Super Admin",
            admin: "Admin",
            staff: "Staff",
          };

          return <span>{map[val]}</span>;
        },
        status(val) {
          const variantMap: Record<string, BadgeVariants> = {
            active: "success",
            inactive: "danger",
          };

          const valueMap: Record<string, string> = {
            active: "Aktif",
            inactive: "Non Aktif",
          };

          return <Badge variant={variantMap[val]}>{valueMap[val]}</Badge>;
        },
      }}
      minWidths={{
        name: "min-w-[180px] w-[180px]",
        role: "min-w-[120px] w-[120px]",
        email: "min-w[180px] w-full",
        status: "min-w-[120px] w-[120px]",
      }}
      renderActionColumn={(row) => {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="size-8" variant="outline">
                <EllipsisVerticalIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-44 p-1.5 bg-white shadow-lg rounded-lg"
            >
              <Link href={`/account/admin/${row.id}/edit`}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-neutral-700 px-3"
                >
                  Edit
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};
