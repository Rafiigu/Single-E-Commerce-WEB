"use client";

import { Table } from "@/components/shared/table";
import { Badge, BadgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserAccount } from "@/types";
import { formatRupiah } from "@/utils/format-rupiah";
import { EllipsisVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  users: UserAccount[];
  page: number;
  total: number;
};

export const UserAccountTable = ({ users, page, total }: Props) => {
  const router = useRouter();
  return (
    <Table
      data={users}
      total={total}
      page={page}
      headers={{
        name: "Nama Lengkap",
        email: "Email",
        status: "Status",
        balance: "Saldo",
      }}
      render={{
        name(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        status(val) {
          const variantMap: Record<string, BadgeVariants> = {
            verified: "success",
            "not-verified": "default",
          };

          const valueMap: Record<string, string> = {
            verified: "Terverifikasi",
            "not-verified": "Belum Terverifikasi",
          };

          return <Badge variant={variantMap[val]}>{valueMap[val]}</Badge>;
        },
        balance(val) {
          return <span className="text-neutral-900">{formatRupiah(val)}</span>;
        },
      }}
      minWidths={{
        name: "min-w-[180px] w-[180px]",
        email: "min-w[180px] w-full",
        balance: "min-w-[120px] w-[120px]",
        status: "min-w-[150px] w-[150px]",
      }}
    />
  );
};
