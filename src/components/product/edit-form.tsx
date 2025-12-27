"use client";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductDetailsForm } from "./details-form";
import { updateProduct } from "@/actions/product/update-product";
import { uploadProductImage } from "@/actions/product/upload-product-image";

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
        let fileName = formState.fileName;
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

        const { data, error, errorFields } = await updateProduct({
          id: product.id,
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
