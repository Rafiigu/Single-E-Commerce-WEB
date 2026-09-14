import { listTransactions } from "@/actions/transaction/list-transactions";
import { TransactionFilterForm } from "@/components/transaction/filter-form";
import { TransactionTable } from "@/components/transaction/table";

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }>;
};

const TransactionPage = async ({ searchParams: rawSearchParams }: Props) => {
  const searchParams = await rawSearchParams;
  const page = Math.max(parseInt(searchParams.page || "1"), 1);
  const {
    data: transactions,
    total,
    error,
  } = await listTransactions({
    page,
    status: searchParams.status,
    startDate: searchParams.startDate ? searchParams.startDate : undefined,
    endDate: searchParams.endDate ? searchParams.endDate : undefined,
  });
  if (error) {
    throw new Error(error);
  }
  console.log("TEST", searchParams.startDate, searchParams.endDate);
  return (
    <div className="flex w-full flex-col justify-center p-4 gap-y-4">
      <div className="flex w-full items-center justify-between">
        <TransactionFilterForm appliedFilters={searchParams} />
      </div>
      <TransactionTable transactions={transactions} page={page} total={total} />
    </div>
  );
};

export default TransactionPage;
