"use client";

import { Category } from "@/types";
import { useState } from "react";
import { FormHint } from "../shared/form-hint";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormState = {
  name: string;
};

type Props = {
  errorFields?: Record<string, string>;
  action: (formState: FormState) => void;
  category?: Category | null;
};

export const ProductCategoryDetailsForm = ({
  errorFields = {},
  action,
  category,
}: Props) => {
  const [formState, setFormState] = useState<FormState>({
    name: category?.name || "",
  });

  return (
    <form
      className="w-full flex flex-col max-w-[41.5rem] mx-auto gap-y-6"
      action={() => {
        action(formState);
      }}
    >
      <FormHint
        label="Nama Kategori"
        description="Nama dari kategori produk."
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
      <Button className="w-fit ml-auto" type="submit">
        Submit
      </Button>
    </form>
  );
};
