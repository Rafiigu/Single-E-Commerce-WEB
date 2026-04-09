import { PaymentAccountCreateForm } from "@/components/payment-account/create-form";

const createPaymentAccountPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <PaymentAccountCreateForm />
    </div>
  );
};

export default createPaymentAccountPage;
