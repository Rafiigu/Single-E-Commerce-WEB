"use client";

import { PaymentAccount } from "@/types";
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
import { useRouter } from "next/navigation";
import { deactivatePaymentAccount } from "@/actions/payment-account/deactivate-payment-account";
import { activatePaymentAccount } from "@/actions/payment-account/activate-payment-account";

type Props = {
  paymentAccounts: PaymentAccount[];
  page: number;
  total: number;
};

export const PaymentAccountTable = ({
  paymentAccounts,
  page,
  total,
}: Props) => {
  const router = useRouter();
  return (
    <Table
      data={paymentAccounts}
      total={total}
      page={page}
      headers={{
        accountHolderName: "Nama Pemilik Akun",
        paymentTerm: "Nama Akun Pembayaran",
        accountNumber: "Nomor Rekening",
        status: "Status",
      }}
      render={{
        paymentTerm(val) {
          return <span className="text-neutral-900">{val.name}</span>;
        },
        accountHolderName(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        accountNumber(val) {
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
        accountHolderName: "min-w-[200px] w-[580px]",
        paymentTerm: "min-w-[180px] w-[250px]",
        accountNumber: "min-w-[174px] w-[200px]",
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
              className="w-44 p-1.5 bg-white shadow-lg rounded-lg z-10"
            >
              <Link href={`/payment-account/${row.id}/edit`}>
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
                        ? "Non-aktifkan Akun Pembayaran"
                        : "Aktifkan Akun Pembayaran"}
                    </DialogTitle>
                    <DialogDescription>
                      {row.status == "active"
                        ? "Apakah kamu yakin untuk menonaktifkan akun pembayaran ini?"
                        : "Apakah kamu yakin untuk mengaktifkan akun pembayaran ini?"}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={async () => {
                          let error = null;
                          if (row.status === "active") {
                            const { error: err } =
                              await deactivatePaymentAccount({
                                id: row.id,
                              });
                            error = err;
                          } else {
                            const { error: err } = await activatePaymentAccount(
                              {
                                id: row.id,
                              },
                            );
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
                              } akun pembayaran berhasil. `,
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
