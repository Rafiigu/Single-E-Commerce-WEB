"use client";

import { activateAdmin } from "@/actions/accounts/admin/activate-admin";
import { deactivateAdmin } from "@/actions/accounts/admin/deactivate-admin";
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
import { AdminAccount } from "@/types";
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  accounts: AdminAccount[];
  page: number;
  total: number;
};

export const AdminAccountTable = ({ accounts, page, total }: Props) => {
  const router = useRouter();

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
                        ? "Non-aktifkan Akun"
                        : "Aktifkan Akun"}
                    </DialogTitle>
                    <DialogDescription>
                      {row.status === "active"
                        ? "Apakah kamu yakin untuk menonaktifkan akun ini?"
                        : "Apakah kamu yakin untuk mengaktifkan akun ini?"}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={async () => {
                          let error = null;
                          if (row.status === "active") {
                            const { error: err } = await deactivateAdmin({
                              id: row.id,
                            });
                            error = err;
                          } else {
                            const { error: err } = await activateAdmin({
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
                              } akun berhasil.`
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
