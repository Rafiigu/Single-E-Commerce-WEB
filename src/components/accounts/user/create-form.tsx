"use client";

import { useState } from "react";
import { UserAccountDetailsForm } from "./details-form";
import { createUser } from "@/actions/accounts/user/create-user";
import { useRouter } from "next/navigation";

export const UserAccountCreateForm = () => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});
  return (
    <UserAccountDetailsForm
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await createUser({
          data: formState,
        });

        if (errorFields !== null) {
          setErrorFields(errorFields);
        } else if (error) {
          alert(error);
        } else {
          router.push("/account/user");
        }
      }}
    ></UserAccountDetailsForm>
  );
};
