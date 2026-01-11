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
        let uploadedFiles: { imageFileName: string }[] = [];

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

          console.log("here", data);
          if (data) {
            uploadedFiles = data.map((f) => ({
              imageFileName: f.filename,
            }));
          }
        }

        const { data, error, errorFields } = await createProduct({
          data: {
            name: formState.name,
            price: formState.price,
            categoryId: formState.categoryId,
            fileNames: uploadedFiles,
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
