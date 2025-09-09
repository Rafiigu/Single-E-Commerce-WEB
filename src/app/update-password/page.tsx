"use client";

import { updatePassword } from "@/actions/auth/update-password";
import { RedirectIfNotAuthenticated } from "@/components/shared/redirect-if-not-authenticated";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const UpdatePasswordPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <RedirectIfNotAuthenticated>
      <div className="w-full min-h-screen flex items-center justify-center">
        <form
          className="flex flex-col gap-y-5 p-5 rounded-lg bg-white shadow-md w-80"
          action={async () => {
            const { error, errorFields } = await updatePassword({
              data: formState,
            });

            if (errorFields !== null) {
              setErrorFields(errorFields);
            } else if (error !== null) {
              toast.error(error);
            } else {
              toast.success("Update password berhasil!");
              router.replace("/");
            }
          }}
        >
          <h2 className="text-lg text-center font-medium text-neutral-900">
            Update Password
          </h2>
          <PasswordInput
            name="currentPassword"
            placeholder="Input password lama"
            value={formState.currentPassword}
            onChange={(e) =>
              setFormState((st) => ({
                ...st,
                currentPassword: e.target.value,
              }))
            }
            errorMessage={errorFields.currentPassword}
          />
          <PasswordInput
            name="newPassword"
            placeholder="Input password baru"
            value={formState.newPassword}
            onChange={(e) =>
              setFormState((st) => ({
                ...st,
                newPassword: e.target.value,
              }))
            }
            errorMessage={errorFields.newPassword}
          />
          <Button className="mt-2" type="submit">
            Update
          </Button>
        </form>
      </div>
    </RedirectIfNotAuthenticated>
  );
};

export default UpdatePasswordPage;
