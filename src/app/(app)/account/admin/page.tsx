import { listAdmins } from "@/actions/accounts/admin/list-admins";
import { AdminFilterForm } from "@/components/accounts/admin/filter-form";
import { Table } from "@/components/shared/table";
import { Badge, BadgeVariants } from "@/components/ui/badge";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
};

const AdminAccountsPage = async ({ searchParams: rawSearchParams }: Props) => {
  const searchParams = await rawSearchParams;
  const page = Math.max(parseInt(searchParams.page || "1"), 1);
  const {
    data: accounts,
    total,
    error,
  } = await listAdmins({
    page,
    search: searchParams.search,
    status: searchParams.status,
  });
  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <AdminFilterForm appliedFilters={searchParams} />
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
