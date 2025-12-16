"use client";

import { Product } from "@/types";
import { useState } from "react";
import { FormHint } from "../shared/form-hint";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CategoryCombobox } from "../shared/comboboxes/category";
import { Textarea } from "../ui/textarea";
import { uploadProductImage } from "@/actions/product/upload-product-image";
import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";

type FormState = {
  name: string;
  price: string;
  categoryId: string;
  description: string;
  fileURL?: string;
  file?: File;
  fileName: string;
};

type ParsedFormState = {
  name: string;
  price: number;
  categoryId: string;
  description: string;
  file?: File;
  fileName: string;
};

type Props = {
  errorFields?: Record<string, string>;
  action: (formState: ParsedFormState) => void;
  product?: Product | null;
};

export const ProductDetailsForm = ({
  errorFields = {},
  action,
  product,
}: Props) => {
  const [formState, setFormState] = useState<FormState>({
    name: product?.name || "",
    price: product?.price ? String(product?.price) : "",
    categoryId: product?.category.id || "",
    description: product?.description || "",
    fileURL: product?.imageFileName
      ? getProxiedDownloadUrl(`/product/file/${product.imageFileName}`)
      : "",
    fileName: product?.imageFileName || "",
  });

  return (
    <form
      className="w-full flex flex-col max-w-[41.5rem] mx-auto gap-y-6"
      action={async () => {
        action({
          ...formState,
          price: formState.price ? parseInt(formState.price) : 0,
        });
      }}
    >
      <FormHint
        label="Nama"
        description="Nama dari produk."
        errorMessage={errorFields.name}
      >
        <Input
          name="name"
          placeholder="Input nama"
          value={formState.name}
          onChange={(e) => {
            setFormState((st) => ({
              ...st,
              name: e.target.value,
            }));
          }}
        />
      </FormHint>
      <FormHint
        label="Harga"
        description="Harga dari produk."
        errorMessage={errorFields.price}
      >
        <Input
          name="price"
          placeholder="Input harga"
          value={formState.price}
          onChange={(e) => {
            setFormState((st) => ({
              ...st,
              price: e.target.value,
            }));
          }}
        />
      </FormHint>
      <FormHint
        label="Kategori"
        description="Kategori dari produk."
        errorMessage={errorFields.categoryId}
      >
        <CategoryCombobox
          value={formState.categoryId ? [formState.categoryId] : []}
          onValueChange={(val) => {
            setFormState((st) => ({
              ...st,
              categoryId: val?.at(-1) || "",
            }));
          }}
        />
      </FormHint>
      <FormHint
        label="Deskripsi"
        description="Deskripsi dari produk."
        errorMessage={errorFields.description}
      >
        <Textarea
          name="description"
          placeholder="Input deskripsi"
          value={formState.description}
          onChange={(e) => {
            setFormState((st) => ({
              ...st,
              description: e.target.value,
            }));
          }}
        />
      </FormHint>
      <FormHint label="Gambar" description="Gambar dari produk.">
        <Input
          errorMessage={errorFields.fileName}
          name="file"
          placeholder="Input file"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files?.[0];
              setFormState((st) => ({
                ...st,
                file,
                fileURL: URL.createObjectURL(file),
              }));
            }
          }}
        />
        {formState.fileURL ? (
          <img className="mt-2" src={formState.fileURL} />
        ) : null}
      </FormHint>
      <Button className="w-fit ml-auto" type="submit">
        Submit
      </Button>
    </form>
  );
};
