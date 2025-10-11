import { listAdmins } from "@/actions/account/admin/list-admins";
import { Table } from "@/components/shared/table";
import { Badge, BadgeVariants } from "@/components/ui/badge";

const AdminAccountsPage = async () => {
  const { data: accounts, error } = await listAdmins();

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-2">
      <Table
        data={accounts}
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

            return <Badge variant={variantMap[val]}>{val}</Badge>;
          },
        }}
        minWidths={{
          name: "min-w-[180px] w-[180px]",
          role: "min-w-[120px] w-[120px]",
          email: "min-w[180px] w-full",
          status: "min-w-[120px] w-[120px]",
        }}
      />
    </div>
  );
};

export default AdminAccountsPage;
