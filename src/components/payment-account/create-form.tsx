"use client";

import { useRouter } from "next/navigation";
import { PaymentAccountDetailsForm } from "./details-form";
import { useState } from "react";
import { createPaymentAccount } from "@/actions/payment-account/create-payment-account";

export const PaymentAccountCreateForm = () => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});
  return (
    <PaymentAccountDetailsForm
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await createPaymentAccount({
          data: formState,
        });

        if (errorFields !== null) {
          setErrorFields(errorFields);
        } else if (error) {
          alert(error);
        } else {
          router.push("/payment-account");
        }
      }}
    ></PaymentAccountDetailsForm>
  );
};
