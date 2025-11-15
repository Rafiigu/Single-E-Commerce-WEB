"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCategory } from "@/actions/category/create-product";
import { ProductCategoryDetailsForm } from "./details-form";

export const CategoryCreateForm = () => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <ProductCategoryDetailsForm
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await createCategory({
          data: formState,
        });

        if (errorFields !== null) {
          setErrorFields(errorFields);
        } else if (error) {
          alert(error);
        } else {
          router.push("/product-category");
        }
      }}
    />
  );
};
