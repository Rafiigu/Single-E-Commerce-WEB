"use client";

import { AdminAccountDetailsForm } from "./details-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminAccount } from "@/types";
import { updateAdmin } from "@/actions/accounts/admin/update-admin";

type Props = {
  adminAccount: AdminAccount;
};

export const AdminAccountEditForm = ({ adminAccount }: Props) => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <AdminAccountDetailsForm
      adminAccount={adminAccount}
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await updateAdmin({
          data: formState,
        });

        if (errorFields !== null) {
          setErrorFields(errorFields);
        } else if (error) {
          alert(error);
        } else {
          router.push("/account/admin");
        }
      }}
    />
  );
};
