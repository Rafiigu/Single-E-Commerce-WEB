"use client";

import { ProductCategory } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductCategoryDetailsForm } from "./details-form";
import { updateCategory } from "@/actions/category/update-category";

type Props = {
  productCategory: ProductCategory;
};

export const ProductCategoryEditForm = ({ productCategory }: Props) => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <ProductCategoryDetailsForm
      category={productCategory}
      errorFields={errorFields}
      action={async (formState) => {
        const { data, error, errorFields } = await updateCategory(
          {
            data: formState,
          },
          productCategory.id
        );

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
