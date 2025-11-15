import { listPaymentTerms } from "@/actions/payment-term/list-payment-term";
import { PaymentTermFilterForm } from "@/components/payment-term/filter-form";
import { PaymentTermTable } from "@/components/payment-term/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
};

const PaymentTermPage = async ({ searchParams: rawSearchParams }: Props) => {
  const searchParams = await rawSearchParams;
  const page = Math.max(parseInt(searchParams.page || "1"), 1);
  const {
    data: paymentTerms,
    total,
    error,
  } = await listPaymentTerms({
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
        <PaymentTermFilterForm appliedFilters={searchParams} />
        <Link href="/payment-term/create">
          <Button>+ Tambah</Button>
        </Link>
      </div>
      <PaymentTermTable paymentTerm={paymentTerms} page={page} total={total} />
    </div>
  );
};

export default PaymentTermPage;
