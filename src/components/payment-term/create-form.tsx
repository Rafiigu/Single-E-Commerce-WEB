"use client";

import { useRouter } from "next/navigation";
import { PaymentTermDetailsForm } from "./details-form";
import { useState } from "react";
import { createPaymentTerm } from "@/actions/payment-term/create-payment-term";

export const PaymentTermCreateForm = () => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});
  return (
    <PaymentTermDetailsForm
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await createPaymentTerm({
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
    ></PaymentTermDetailsForm>
  );
};
