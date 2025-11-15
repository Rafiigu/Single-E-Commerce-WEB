"use client";

import { ProductCategory } from "@/types";
import { Table } from "../shared/table";
import { Badge, BadgeVariants } from "../ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  categories: ProductCategory[];
  page: number;
  total: number;
};

export const ProductCategoryTable = ({ categories, page, total }: Props) => {
  return (
    <Table
      data={categories}
      total={total}
      page={page}
      headers={{
        name: "Nama",
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
        name: "min-w-[180px] w-full",
        status: "min-w-[150px] w-[150px]",
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
              <Link href={`/product-category/${row.id}/edit`}>
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
