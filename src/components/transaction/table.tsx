"use client";

import { Transaction } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Table } from "../shared/table";
import { Badge, BadgeVariants } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
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
import { processTransaction } from "@/actions/transaction/process-transaction";
import { deliverTransaction } from "@/actions/transaction/deliver-transaction";
import { cancelTransaction } from "@/actions/transaction/cancel-transaction";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

type Props = {
  transactions: Transaction[];
  page: number;
  total: number;
};

export const TransactionTable = ({ transactions, page, total }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState<string | null>(null);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const resetDialog = () => {
    setActiveDialog(null);
    setCancellationReason("");
  };
  return (
    <Table
      data={transactions}
      total={total}
      page={page}
      headers={{
        user: "User",
        total: "Total",
        status: "Status",
        receiverName: "Nama Penerima",
        receiverAddress: "Alamat Penerima",
        receiverPhoneNumber: "Nomor Telepon Penerima",
        logisticVendorName: "Vendor Logistik",
        cancellationReason: "Alasan Pembatalan",
        deliveredAt: "Tanggal Dikirim",
        processedAt: "Tanggal Diproses",
        createdAt: "Tanggal Dibuat",
      }}
      render={{
        user(val) {
          return <span className="text-neutral-900">{val?.name}</span>;
        },
        total(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        status(val) {
          const variantMap: Record<string, BadgeVariants> = {
            delivered: "success",
            cancelled: "danger",
            pending: "default",
            "in process": "info",
          };
          const valueMap: Record<string, string> = {
            delivered: "Delivered",
            cancelled: "Cancelled",
            pending: "Pending",
            "in process": "In Process",
          };
          return <Badge variant={variantMap[val]}>{valueMap[val]}</Badge>;
        },
        receiverName(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        receiverAddress(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        receiverPhoneNumber(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        logisticVendorName(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        cancellationReason(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        deliveredAt(val) {
          return (
            <span className="text-neutral-900">
              {val
                ? new Date(val).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </span>
          );
        },
        createdAt(val) {
          return (
            <span className="text-neutral-900">
              {new Date(val).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          );
        },
      }}
      minWidths={{
        user: "w-[250px]",
        total: "w-[200px]",
        status: "w-[250px]",
        receiverName: "w-[250px]",
        receiverAddress: "w-[300px]",
        receiverPhoneNumber: "w-[200px]",
        logisticVendorName: "w-[250px]",
        cancellationReason: "w-[300px]",
        deliveredAt: "w-[150px]",
        processedAt: "w-[150px]",
        createdAt: "w-[150px]",
      }}
      renderActionColumn={(transaction) => {
        if (transaction.status == "pending") {
          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="size-8" variant="outline">
                  <EllipsisVerticalIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-44 p-1.5 bg-white shadow-lg rounded-lg z-10"
              >
                <Button
                  onClick={() => {
                    setCancellationReason("");
                    setActiveDialog("Process");
                  }}
                  variant="ghost"
                  className="w-full justify-start text-neutral-700 px-3"
                >
                  Process
                </Button>
                <Button
                  onClick={() => {
                    setCancellationReason("");
                    setActiveDialog("Cancel");
                  }}
                  variant="ghost"
                  className="w-full justify-start text-neutral-700 px-3"
                >
                  Cancel
                </Button>
                <Dialog
                  open={!!activeDialog}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      resetDialog();
                    }
                  }}
                >
                  <DialogTrigger asChild></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {activeDialog === "Process"
                          ? "Process Transaksi"
                          : "Cancel Transaksi"}
                      </DialogTitle>
                      <DialogDescription>
                        {activeDialog === "Process"
                          ? "Apakah kamu yakin untuk memproses transaksi ini?"
                          : "Apakah kamu yakin untuk membatalkan transaksi ini?"}
                      </DialogDescription>
                    </DialogHeader>
                    {activeDialog === "Cancel" ? (
                      <Textarea
                        label="Alasan Pembatalan"
                        placeholder="Masukkan alasan pembatalan"
                        value={cancellationReason}
                        onChange={(e) => setCancellationReason(e.target.value)}
                        required
                      />
                    ) : null}
                    <DialogFooter>
                      <Button
                        onClick={async () => {
                          if (
                            activeDialog === "Cancel" &&
                            !cancellationReason.trim()
                          ) {
                            toast.error("Alasan pembatalan harus diisi");
                            return;
                          }

                          let error = null;
                          if (activeDialog === "Process") {
                            const { error: err } = await processTransaction({
                              id: transaction.id,
                            });
                            error = err;
                          } else {
                            const { error: err } = await cancelTransaction({
                              id: transaction.id,
                              cancellationReason: cancellationReason.trim(),
                            });
                            error = err;
                          }
                          if (error) {
                            toast.error(error);
                          } else {
                            toast.success(
                              activeDialog === "Process"
                                ? "Berhasil di-Process"
                                : "Berhasil di-Cancel",
                            );
                            resetDialog();
                          }
                          router.refresh();
                        }}
                      >
                        {activeDialog === "Process" ? "Process" : "Cancel"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </PopoverContent>
            </Popover>
          );
        }
        if (transaction.status == "in process") {
          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="size-8" variant="outline">
                  <EllipsisVerticalIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-44 p-1.5 bg-white shadow-lg rounded-lg z-10"
              >
                <Button
                  onClick={() => setActiveDialog("Deliver")}
                  variant="ghost"
                  className="w-full justify-start text-neutral-700 px-3"
                >
                  Deliver
                </Button>
                <Dialog
                  open={!!activeDialog}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      resetDialog();
                    }
                  }}
                >
                  <DialogTrigger asChild></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deliver Transaksi</DialogTitle>
                      <DialogDescription>
                        Apakah kamu yakin untuk mengirimkan transaksi ini?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={async () => {
                            const { error } = await deliverTransaction({
                              id: transaction.id,
                            });
                            if (error) {
                              toast.error(error);
                            } else {
                              toast.success("Berhasil di-Deliver");
                            }
                            router.refresh();
                          }}
                        >
                          Deliver
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </PopoverContent>
            </Popover>
          );
        }
      }}
    />
  );
};
