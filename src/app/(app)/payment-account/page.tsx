import { listPaymentAccounts } from "@/actions/payment-account/list-payment-account";
import { PaymentAccountFilterForm } from "@/components/payment-account/filter-form";
import { PaymentAccountTable } from "@/components/payment-account/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
};

const PaymentAccountPage = async ({ searchParams: rawSearchParams }: Props) => {
  const searchParams = await rawSearchParams;
  const page = Math.max(parseInt(searchParams.page || "1"), 1);
  const {
    data: paymentAccounts,
    total,
    error,
  } = await listPaymentAccounts({
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
        <PaymentAccountFilterForm appliedFilters={searchParams} />
        <Link href="/payment-account/create">
          <Button>+ Tambah</Button>
        </Link>
      </div>
      <PaymentAccountTable
        paymentAccounts={paymentAccounts}
        page={page}
        total={total}
      />
    </div>
  );
};

export default PaymentAccountPage;
