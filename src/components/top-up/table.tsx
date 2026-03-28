"use client";

import { TopUp } from "@/types";
import { Table } from "../shared/table";
import { Badge, BadgeVariants } from "../ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
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
import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";
import { useState } from "react";
import { approveTopUp } from "@/actions/top-up/approve-top-up";
import { rejectTopUp } from "@/actions/top-up/reject-top-up";

type Props = {
  topUps: TopUp[];
  page: number;
  total: number;
};

export const TopUpTable = ({ topUps, page, total }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState<string | null>(null);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  return (
    <Table
      data={topUps}
      total={total}
      page={page}
      headers={{
        user: "User",
        nominal: "Nominal",
        admin: "Admin",
        proofOfTransferFileName: "Bukti Transfer",
        status: "Status",
        paymentAccount: "Nama Akun Tujuan",
      }}
      render={{
        nominal(val) {
          return <span className="text-neutral-900">{val}</span>;
        },
        admin(val) {
          return <span className="text-neutral-900">{val?.name}</span>;
        },
        user(val) {
          return <span className="text-neutral-900">{val.name}</span>;
        },
        proofOfTransferFileName(_, topUp) {
          const image = topUp.proofOfTransferFileName;
          if (image && image.length === 0) {
            return <div className="bg-neutral-400 size-10" />;
          }

          if (image && image.length > 0) {
            return (
              <>
                <img
                  onClick={() => setOpen(topUp.id)}
                  src={getProxiedDownloadUrl(`/product/file/${image}`)}
                  className="size-10 object-cover cursor-pointer rounded"
                />

                <Dialog
                  open={open === topUp.id}
                  onOpenChange={(isOpen) => !isOpen && setOpen(null)}
                >
                  <DialogTitle></DialogTitle>
                  <DialogContent showCloseButton={false} className="max-w-4xl">
                    <div>
                      {" "}
                      <img
                        src={getProxiedDownloadUrl(`/product/file/${image}`)}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            );
          }
        },
        status(val) {
          const variantMap: Record<string, BadgeVariants> = {
            approved: "success",
            rejected: "danger",
            cancelled: "warning",
            requested: "default",
            transferred: "info",
          };

          const valueMap: Record<string, string> = {
            approved: "Approved",
            rejected: "Rejected",
            cancelled: "Cancelled",
            requested: "Requested",
            transferred: "Transferred",
          };

          return <Badge variant={variantMap[val]}>{valueMap[val]}</Badge>;
        },
        paymentAccount(val) {
          return (
            <span className="text-neutral-900">{val?.accountHolderName}</span>
          );
        },
      }}
      minWidths={{
        user: "w-[250px]",
        nominal: "w-[200px]",
        admin: "w-[250px]",
        status: "w-[120px]",
        proofOfTransferFileName: "w-[120px]",
        paymentAccount: "w-[500px]",
      }}
      renderActionColumn={(topUp) => {
        if (topUp.status == "transferred") {
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
                  onClick={() => setActiveDialog("Approve")}
                  variant="ghost"
                  className="w-full justify-start text-neutral-700 px-3"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => setActiveDialog("Reject")}
                  variant="ghost"
                  className="w-full justify-start text-neutral-700 px-3"
                >
                  Reject
                </Button>
                <Dialog
                  open={!!activeDialog}
                  onOpenChange={() => setActiveDialog(null)}
                >
                  <DialogTrigger asChild></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {activeDialog === "Approve"
                          ? "Approve Top-Up"
                          : "Reject Top-Up"}
                      </DialogTitle>
                      <DialogDescription>
                        {activeDialog === "Approve"
                          ? "Apakah kamu yakin untuk meng-approve top-up ini?"
                          : "Apakah kamu yakin untuk menolak top-up ini?"}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={async () => {
                            let error = null;
                            if (activeDialog === "Approve") {
                              const { error: err } = await approveTopUp({
                                id: topUp.id,
                              });
                              error = err;
                            } else {
                              const { error: err } = await rejectTopUp({
                                id: topUp.id,
                              });
                              error = err;
                            }

                            if (error) {
                              alert(error);
                            } else {
                              alert(
                                `Berhasil di-${
                                  activeDialog === "Approve"
                                    ? "Approve"
                                    : "Reject"
                                }`,
                              );
                            }
                            router.refresh();
                          }}
                        >
                          {activeDialog === "Approve" ? "Approve" : "Reject"}
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
