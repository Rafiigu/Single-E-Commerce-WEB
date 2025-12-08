"use client";

import { useRouter } from "next/navigation";
import { ProductDetailsForm } from "./details-form";
import { useState } from "react";
import { createProduct } from "@/actions/product/create-product";

export const ProductCreateForm = () => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});
  return (
    <ProductDetailsForm
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await createProduct({
          data: formState,
        });

        if (errorFields !== null) {
          setErrorFields(errorFields);
        } else if (error) {
          alert(error);
        } else {
          router.push("/product");
        }
      }}
    />
  );
};
