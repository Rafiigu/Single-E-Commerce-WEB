"use client";

import { createAdmin } from "@/actions/accounts/admin/create-admin";
import { AdminAccountDetailsForm } from "./details-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const AdminAccountCreateForm = () => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <AdminAccountDetailsForm
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await createAdmin({
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
