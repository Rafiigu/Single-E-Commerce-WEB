import { Table } from "@/components/shared/table";
import { Badge, BadgeVariants } from "@/components/ui/badge";
import { AdminAccount } from "@/types";

type Props = {
  accounts: AdminAccount[];
  page: number;
  total: number;
};

export const AdminAccountTable = ({ accounts, page, total }: Props) => {
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
    />
  );
};
