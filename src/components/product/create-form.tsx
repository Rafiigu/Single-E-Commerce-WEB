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
        let fileName = "";
        if (formState.file) {
          const formData = new FormData();
          formData.set("file", formState.file);
          const { data, error, errorFields } = await uploadProductImage({
            data: formData,
          });

          if (errorFields !== null) {
            setErrorFields(errorFields);
            return;
          } else if (error) {
            alert(error);
            return;
          } else {
            fileName = data?.filename || "";
          }
        }

        const { data, error, errorFields } = await createProduct({
          data: {
            ...formState,
            fileName,
          },
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
