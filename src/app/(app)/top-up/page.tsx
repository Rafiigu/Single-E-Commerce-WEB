import { listTopUps } from "@/actions/top-up/list-top-up";
import { TopUpFilterForm } from "@/components/top-up/filter-form";
import { TopUpTable } from "@/components/top-up/table";

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
};

const TopUpPage = async ({ searchParams: rawSearchParams }: Props) => {
  const searchParams = await rawSearchParams;
  const page = Math.max(parseInt(searchParams.page || "1"), 1);
  const {
    data: topUps,
    total,
    error,
  } = await listTopUps({
    page,
    status: searchParams.status,
    dateFrom: searchParams.dateFrom,
    dateTo: searchParams.dateTo,
  });
  if (error) {
    throw new Error(error);
  }
  return (
    <div className="flex w-full flex-col justify-center p-4 gap-y-4">
      <div className="flex w-full items-center justify-between">
        <TopUpFilterForm appliedFilters={searchParams} />
      </div>
      <TopUpTable topUps={topUps} page={page} total={total} />
    </div>
  );
};

export default TopUpPage;
