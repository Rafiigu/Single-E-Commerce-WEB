import { PaymentTermCreateForm } from "@/components/payment-term/create-form";

const createPaymentTermPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <PaymentTermCreateForm />
    </div>
  );
};

export default createPaymentTermPage;
