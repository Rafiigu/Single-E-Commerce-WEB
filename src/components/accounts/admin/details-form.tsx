"use client";

import { FormHint } from "@/components/shared/form-hint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminAccount } from "@/types";
import { Select } from "@radix-ui/react-select";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  role: string;
};

type Props = {
  errorFields?: Record<string, string>;
  action: (formState: FormState) => void;
  adminAccount?: AdminAccount | null;
};

export const AdminAccountDetailsForm = ({
  errorFields = {},
  action,
  adminAccount,
}: Props) => {
  const [formState, setFormState] = useState<FormState>({
    name: adminAccount?.name || "",
    email: adminAccount?.email || "",
    role: adminAccount?.role || "",
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
        description="Nama lengkap dari admin."
        errorMessage={errorFields.name}
      >
        <Input
          name="name"
          placeholder="Input nama"
          value={formState.name}
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
        description="Email dari admin."
        errorMessage={errorFields.email}
      >
        <Input
          name="email"
          placeholder="Input email"
          value={formState.email}
          onChange={(e) => {
            setFormState((st) => ({
              ...st,
              email: e.target.value,
            }));
          }}
        />
      </FormHint>
      <FormHint
        label="Role"
        description="Role dari admin."
        errorMessage={errorFields.role}
      >
        <Select
          name="role"
          value={formState.role}
          onValueChange={(v) => {
            setFormState((st) => ({
              ...st,
              role: v,
            }));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </FormHint>
      <Button className="w-fit ml-auto" type="submit">
        Submit
      </Button>
    </form>
  );
};
