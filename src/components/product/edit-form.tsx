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
  console.log("product", product);
  return (
    <ProductDetailsForm
      product={product}
      errorFields={errorFields}
      action={async (formState) => {
        let uploadedFiles: { imageFileName: string }[] = [];
        if (formState.files && formState.files.length > 0) {
          const formData = new FormData();
          formState.files.forEach((file) => formData.append("files", file));

          const { data, error, errorFields } = await uploadProductImage({
            data: formData,
          });

          if (errorFields !== null) {
            setErrorFields(errorFields);
            return;
          } else if (error) {
            alert(error);
            return;
          }

          if (data) {
            uploadedFiles = data.map((f) => ({
              imageFileName: f.filename,
            }));
          }
        }

        const { data, error, errorFields } = await updateProduct({
          id: product.id,
          data: {
            name: formState.name,
            price: formState.price,
            categoryId: formState.categoryId,
            fileNames: uploadedFiles,
            description: formState.description,
            deletedFileNames: formState.deletedImages || [],
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
