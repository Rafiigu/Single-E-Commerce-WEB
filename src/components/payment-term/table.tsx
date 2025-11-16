"use client";

import { PaymentTerm } from "@/types";
import { Table } from "../shared/table";
import { Badge, BadgeVariants } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { deactivateAdmin } from "@/actions/accounts/admin/deactivate-admin";
import { activateAdmin } from "@/actions/accounts/admin/activate-admin";
import { useRouter } from "next/navigation";
import { deactivatePaymentTerm } from "@/actions/payment-term/deactivate-payment-term";
import { activatePaymentTerm } from "@/actions/payment-term/activate-payment-term";

type Props = {
  paymentTerm: PaymentTerm[];
  page: number;
  total: number;
};

export const PaymentTermTable = ({ paymentTerm, page, total }: Props) => {
  const router = useRouter();
  return (
    <Table
      data={paymentTerm}
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
              <Button className="size-8" variant={"outline"}>
                <EllipsisVerticalIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-44 p-1.5 bg-white shadow-lg rounded-lg"
            >
              <Link href={`/payment-term/${row.id}/edit`}>
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
                        ? "Non-aktifkan Cara Pembayaran"
                        : "Aktifkan Cara Pembayaran"}
                    </DialogTitle>
                    <DialogDescription>
                      {row.status == "active"
                        ? "Apakah kamu yakin untuk menonaktifkan cara pembayaran ini?"
                        : "Apakah kamu yakin untuk mengaktifkan cara pembayaran ini?"}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={async () => {
                          let error = null;
                          if (row.status === "active") {
                            const { error: err } = await deactivatePaymentTerm({
                              id: row.id,
                            });
                            error = err;
                          } else {
                            const { error: err } = await activatePaymentTerm({
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
                              } cara pembayaran berhasil. `
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
