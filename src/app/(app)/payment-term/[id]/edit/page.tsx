import { getPaymentTerm } from "@/actions/payment-term/get-payment-term";
import { PaymentTermEditForm } from "@/components/payment-term/edit-form";
import { PaymentTerm } from "@/types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EditPaymentTermPage = async ({ params: rawParams }: Props) => {
  const params = await rawParams;
  const { data: paymentTerm, error } = await getPaymentTerm({
    id: params.id,
  });
  if (error) {
    throw error;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <PaymentTermEditForm paymentTerm={paymentTerm as PaymentTerm} />
    </div>
  );
};

export default EditPaymentTermPage;
