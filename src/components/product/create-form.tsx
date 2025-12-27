"use client";

import { useRouter } from "next/navigation";
import { ProductDetailsForm } from "./details-form";
import { useState } from "react";
import { createProduct } from "@/actions/product/create-product";
import { uploadProductImage } from "@/actions/product/upload-product-image";

export const ProductCreateForm = () => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});
  return (
    <ProductDetailsForm
      errorFields={errorFields}
      action={async (formState) => {
        if (formState.files && formState.files.length > 0) {
          const formData = new FormData();
          formState.files.forEach((file) => formData.append("files", file));

          const { data, error, errorFields } = await uploadProductImage({
            data: formData,
          });

          if (errorFields) {
            setErrorFields(errorFields);
            return;
          } else if (error) {
            console.log(error);
            return;
          }
        }

        const { data, error, errorFields } = await createProduct({
          data: {
            name: formState.name,
            price: formState.price,
            categoryId: formState.categoryId,
            fileName: "",
            description: formState.description,
          },
        });

        if (errorFields) {
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
