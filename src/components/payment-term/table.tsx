"use client";

import { PaymentTerm } from "@/types";
import { Table } from "../shared/table";
import { Badge, BadgeVariants } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  paymentTerm: PaymentTerm[];
  page: number;
  total: number;
};

export const PaymentTermTable = ({ paymentTerm, page, total }: Props) => {
  return (
    <Table
      data={paymentTerm}
      total={total}
      page={page}
      headers={{
        name: "Nama Produk",
        status: "Status",
      }}
      render={{
        name(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        status(val) {
          const variantMap: Record<string, BadgeVariants> = {
            active: "success",
            inactive: "default",
          };

          const valueMap: Record<string, string> = {
            active: "Active",
            inactive: "Inactive",
          };

          return <Badge variant={variantMap[val]}>{valueMap[val]}</Badge>;
        },
      }}
      minWidths={{
        name: "min-w-[180px] w-[180px]",
        status: "min-w-[150px] w-[150px]",
      }}
      renderActionColumn={(row) => {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="size-8" variant={"outline"}>
                <EllipsisVerticalIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-44 p-2">
              <Link href={`/payment-term/${row.id}/edit`}>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start text-neutral-700 px-3"
                >
                  Edit
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        );
      }}
    ></Table>
  );
};
