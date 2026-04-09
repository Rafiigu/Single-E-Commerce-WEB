import { getPaymentAccount } from "@/actions/payment-account/get-payment-account";
import { PaymentAccountEditForm } from "@/components/payment-account/edit-form";
import { PaymentAccount } from "@/types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EditPaymentAccountPage = async ({ params: rawParams }: Props) => {
  const params = await rawParams;
  const { data: paymentAccount, error } = await getPaymentAccount({
    id: params.id,
  });
  if (error) {
    throw error;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <PaymentAccountEditForm
        paymentAccount={paymentAccount as PaymentAccount}
      />
    </div>
  );
};

export default EditPaymentAccountPage;
