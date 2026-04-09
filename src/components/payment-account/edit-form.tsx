"use client";

import { PaymentAccount } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PaymentAccountDetailsForm } from "./details-form";
import { updatePaymentAccount } from "@/actions/payment-account/update-payment-account";

type Props = {
  paymentAccount: PaymentAccount;
};

export const PaymentAccountEditForm = ({ paymentAccount }: Props) => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <PaymentAccountDetailsForm
      paymentAccount={paymentAccount}
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await updatePaymentAccount({
          id: paymentAccount.id,
          data: formState,
        });
        console.log({ data, error, errorFields });
        if (errorFields !== null) {
          setErrorFields(errorFields);
        } else if (error) {
          console.log(formState);
          alert(error);
        } else {
          router.push("/payment-account");
        }
      }}
    />
  );
};
