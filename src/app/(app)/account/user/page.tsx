import { listUsers } from "@/actions/accounts/user/list-users";
import { UserFilterForm } from "@/components/accounts/user/filter-form";
import { UserAccountTable } from "@/components/accounts/user/table";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
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
    search: searchParams.search,
    status: searchParams.status,
  });
  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <div className="flex w-full items-center">
        <UserFilterForm appliedFilters={searchParams} />
      </div>
      <UserAccountTable users={users} page={page} total={total} />
    </div>
  );
};

export default UserAccountsPage;
