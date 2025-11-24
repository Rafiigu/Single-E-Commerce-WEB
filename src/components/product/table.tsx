"use client";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { Table } from "../shared/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";
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
import { deactivateProduct } from "@/actions/product/deactivate-product";
import { activateProduct } from "@/actions/product/activate-product";
import { Badge, BadgeVariants } from "../ui/badge";

type Props = {
  products: Product[];
  page: number;
  total: number;
};

export const ProductTable = ({ products, page, total }: Props) => {
  const router = useRouter();
  return (
    <Table
      data={products}
      total={total}
      page={page}
      headers={{
        name: "Nama",
        price: "Harga",
        stock: "Stok",
        description: "Deskripsi",
        category: "Kategori",
        status: "Status",
      }}
      render={{
        name(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        price(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        stock(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        description(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        category(val) {
          return <span className="text-neutral-900">{val.name}</span>;
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
        price: "min-w-[150px] w-[150px]",
        stock: "min-w-[100px] w-[100px]",
        description: "min-w-[200px] w-[200px]",
        category: "min-w-[150px] w-[150px]",
      }}
      renderActionColumn={(row) => {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="size-8" variant={"outline"}>
                <EllipsisVerticalIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-44 p-1.5 bg-white shadow-lg rounded-lg z-10"
            >
              <Link href={`/product/${row.id}/edit`}>
                <Button
                  variant={"ghost"}
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
                        ? "Non-aktifkan Produk"
                        : "Aktifkan Produk"}
                    </DialogTitle>
                    <DialogDescription>
                      {row.status == "active"
                        ? "Apakah kamu yakin untuk menonaktifkan produk ini?"
                        : "Apakah kamu yakin untuk mengaktifkan produk ini?"}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={async () => {
                          let error = null;
                          if (row.status === "active") {
                            const { error: err } = await deactivateProduct({
                              id: row.id,
                            });
                            error = err;
                          } else {
                            const { error: err } = await activateProduct({
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
                              } produk berhasil. `
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
    ></Table>
  );
};
