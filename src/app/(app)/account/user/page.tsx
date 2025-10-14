import { listUsers } from "@/actions/admin/user/list-users";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { Table } from "@/components/shared/table";
import { Badge, BadgeVariants } from "@/components/ui/badge";
import { formatRupiah } from "@/utils/format-rupiah";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const UserAccountsPage = async ({ searchParams: rawSearchParams }: Props) => {
  const searchParams = await rawSearchParams;
  const page = Math.max(parseInt(searchParams.page || "1"), 1);
  const {
    data: users,
    total,
    error,
  } = await listUsers({
    page,
  });

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-2">
      <Table
        data={users}
        headers={{
          name: "Nama Lengkap",
          email: "Email",
          status: "Status",
          balance: "Saldo",
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

            const valueMap: Record<string, string> = {
              verified: "Terverifikasi",
              "not-verified": "Belum Terverifikasi",
            };

            return <Badge variant={variantMap[val]}>{valueMap[val]}</Badge>;
          },
          balance(val) {
            return (
              <span className="text-neutral-900">{formatRupiah(val)}</span>
            );
          },
        }}
        minWidths={{
          name: "min-w-[180px] w-[180px]",
          email: "min-w[180px] w-full",
          balance: "min-w-[120px] w-[120px]",
          status: "min-w-[150px] w-[150px]",
        }}
      />
      <PaginationControls page={page} total={total} />
    </div>
  );
};

export default UserAccountsPage;
