import { listUsers } from "@/actions/admin/user/list-users";
import { Table } from "@/components/shared/table";
import { Badge, BadgeVariants } from "@/components/ui/badge";

const UserAccountsPage = async () => {
  const { data: accounts, error } = await listUsers();

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-2">
      <Table
        data={accounts}
        headers={{
          name: "Nama Lengkap",
          email: "Email",
          status: "Status",
        }}
        render={{
          name(val) {
            return <span className="text-neutral-900">{val}</span>;
          },
          status(val) {
            const variantMap: Record<string, BadgeVariants> = {
              verified: "success",
              "not-verified": "default",
            };

            return <Badge variant={variantMap[val]}>{val}</Badge>;
          },
        }}
        minWidths={{
          name: "min-w-[180px] w-[180px]",
          email: "min-w[180px] w-full",
          status: "min-w-[120px] w-[120px]",
        }}
      />
    </div>
  );
};

export default UserAccountsPage;
