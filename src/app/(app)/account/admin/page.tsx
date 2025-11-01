import { listAdmins } from "@/actions/accounts/admin/list-admins";
import { AdminFilterForm } from "@/components/accounts/admin/filter-form";
import { AdminAccountTable } from "@/components/accounts/admin/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="flex w-full items-center justify-between">
        <AdminFilterForm appliedFilters={searchParams} />
        <Link href="/account/admin/create">
          <Button>+ Tambah</Button>
        </Link>
      </div>
      <AdminAccountTable accounts={accounts} page={page} total={total} />
    </div>
  );
};

export default AdminAccountsPage;
