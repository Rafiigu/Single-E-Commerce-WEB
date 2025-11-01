"use client";

import { FormHint } from "@/components/shared/form-hint";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { UserAccount } from "@/types";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  errorFields?: Record<string, string>;
  action: (formState: FormState) => void;
  userAccount?: UserAccount | null;
};

export const UserAccountDetailsForm = ({
  errorFields = {},
  action,
  userAccount,
}: Props) => {
  const [formState, setFormState] = useState<FormState>({
    name: userAccount?.name || "",
    email: userAccount?.email || "",
    password: userAccount?.password || "",
  });

  return (
    <form
      className="w-full flex flex-col max-w-[41.5rem] mx-auto gap-y-6"
      action={() => {
        action(formState);
      }}
    >
      <FormHint
        label="Nama Lengkap"
        description="Nama lengkap dari User"
        errorMessage={errorFields.name}
      >
        <Input
          name="name"
          placeholder="Input nama"
          onChange={(e) => {
            setFormState((st) => ({
              ...st,
              name: e.target.value,
            }));
          }}
        />
      </FormHint>

      <FormHint
        label="Email"
        description="Email dari user"
        errorMessage={errorFields.email}
      >
        <Input
          name="email"
          placeholder="Input Email"
          onChange={(e) => {
            setFormState((st) => ({
              ...st,
              email: e.target.value,
            }));
          }}
        />
      </FormHint>

      <FormHint
        label="Password"
        description="Password dari User"
        errorMessage={errorFields.password}
      >
        <PasswordInput
          name="Password"
          placeholder="Input Password"
          onChange={(e) => {
            setFormState((st) => ({
              ...st,
              password: e.target.value,
            }));
          }}
        />
      </FormHint>
      <Button type="submit">Submit</Button>
    </form>
  );
};
