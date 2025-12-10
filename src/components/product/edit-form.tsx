"use client";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateCategory } from "@/actions/category/update-category";
import { ProductDetailsForm } from "./details-form";

type Props = {
  product: Product;
};

export const ProductEditForm = ({ product }: Props) => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <ProductDetailsForm
      product={product}
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await updateCategory({
          id: product.id,
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
