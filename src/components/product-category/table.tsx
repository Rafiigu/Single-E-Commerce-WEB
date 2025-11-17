"use client";

import { Category } from "@/types";
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
import { deactivateCategory } from "@/actions/category/deactivate-category";
import { activateCategory } from "@/actions/category/activate-category";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";

type Props = {
  categories: Category[];
  page: number;
  total: number;
};

export const ProductCategoryTable = ({ categories, page, total }: Props) => {
  const router = useRouter();
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
              className="w-44 p-1.5 bg-white shadow-lg rounded-lg z-10"
            >
              <Link href={`/product-category/${row.id}/edit`}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-neutral-700 px-3"
                >
                  Edit
                </Button>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-neutral-700 px-3"
                  >
                    {row.status === "active" ? "Non-aktifkan" : "Aktifkan"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {row.status === "active"
                        ? "Non-aktifkan Kategori"
                        : "Aktifkan Kategori"}
                    </DialogTitle>
                    <DialogDescription>
                      {row.status == "active"
                        ? "Apakah kamu yakin untuk menonaktifkan kategori ini?"
                        : "Apakah kamu yakin untuk mengaktifkan kategori ini?"}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={async () => {
                          let error = null;
                          if (row.status === "active") {
                            const { error: err } = await deactivateCategory({
                              id: row.id,
                            });
                            error = err;
                          } else {
                            const { error: err } = await activateCategory({
                              id: row.id,
                            });
                            error = err;
                          }

                          if (error) {
                            alert(error);
                          } else {
                            alert(
                              `${
                                row.status === "active"
                                  ? "Nonaktifkan"
                                  : "Aktifkan"
                              } kategori berhasil. `
                            );
                          }
                          router.refresh();
                        }}
                      >
                        {row.status === "active" ? "Non-aktifkan" : "Aktifkan"}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};
