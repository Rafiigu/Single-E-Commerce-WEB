"use client";

import { PaymentTerm } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PaymentTermDetailsForm } from "./details-form";
import { updatePaymentTerm } from "@/actions/payment-term/update-payment-term";

type Props = {
  paymentTerm: PaymentTerm;
};

export const PaymentTermEditForm = ({ paymentTerm }: Props) => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <PaymentTermDetailsForm
      paymentTerm={paymentTerm}
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await updatePaymentTerm({
          id: paymentTerm.id,
          data: formState,
        });
        if (errorFields !== null) {
          setErrorFields(errorFields);
        } else if (error) {
          alert(error);
        } else {
          router.push("/payment-term");
        }
      }}
    />
  );
};
