"use client";

import { PaymentAccount } from "@/types";
import { useState } from "react";
import { FormHint } from "../shared/form-hint";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaymentTermCombobox } from "../shared/comboboxes/payment-term";

type FormState = {
  accountHolderName: string;
  paymentTermId: string;
  accountNumber: string;
};

type ParsedFormState = {
  accountHolderName: string;
  paymentTermId: string;
  accountNumber: string;
};

type Props = {
  errorFields?: Record<string, string>;
  action: (formState: ParsedFormState) => void;
  paymentAccount?: PaymentAccount | null;
};

export const PaymentAccountDetailsForm = ({
  errorFields = {},
  action,
  paymentAccount,
}: Props) => {
  const [formState, setFormState] = useState<FormState>({
    accountHolderName: paymentAccount?.accountHolderName || "",
    paymentTermId: paymentAccount?.paymentTerm?.id || "",
    accountNumber: paymentAccount?.accountNumber || "",
  });

  return (
    <form
      className="w-full flex flex-col max-w-[41.5rem] mx-auto gap-y-6"
      action={async () => {
        action(formState);
      }}
    >
      <FormHint
        label="Nama Pemilik Akun"
        description="Nama dari pemiliki akun."
        errorMessage={errorFields.accountHolderName}
      >
        <Input
          name="accountHolderName"
          placeholder="Input nama pemilik akun"
          value={formState.accountHolderName}
          onChange={(e) =>
            setFormState((st) => ({ ...st, accountHolderName: e.target.value }))
          }
        />
      </FormHint>

      <FormHint
        label="Tipe Pembayaran"
        description="Tipe pembayaran."
        errorMessage={errorFields.paymentTermId}
      >
        <PaymentTermCombobox
          value={formState.paymentTermId ? [formState.paymentTermId] : []}
          onValueChange={(val) =>
            setFormState((st) => ({ ...st, paymentTermId: val?.at(-1) || "" }))
          }
        />
      </FormHint>

      <FormHint
        label="Nomor Rekening"
        description="Nomor rekening dari akun."
        errorMessage={errorFields.accountNumber}
      >
        <Input
          name="accountNumber"
          placeholder="Input nomor rekening"
          value={formState.accountNumber}
          onChange={(e) =>
            setFormState((st) => ({ ...st, accountNumber: e.target.value }))
          }
        />
      </FormHint>

      <Button className="w-fit ml-auto" type="submit">
        Submit
      </Button>
    </form>
  );
};
