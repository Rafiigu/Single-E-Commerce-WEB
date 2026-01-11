"use client";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductDetailsForm } from "./details-form";
import { updateProduct } from "@/actions/product/update-product";
import { uploadProductImage } from "@/actions/product/upload-product-image";
import { deleteProductImages } from "@/actions/product/delete-product-image";

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
        console.log("Will be deleted Pictures", formState.deletedImages);
        console.log("Will be uploaded Pictures", formState.files);
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

        if (formState.deletedImages && formState.deletedImages.length > 0) {
          const response = await deleteProductImages({
            data: { fileNames: formState.deletedImages || [] },
          });
          console.log(response);
        }

        const { data, error, errorFields } = await updateProduct({
          id: product.id,
          data: {
            name: formState.name,
            price: formState.price,
            categoryId: formState.categoryId,
            fileNames: uploadedFiles,
            description: formState.description,
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
