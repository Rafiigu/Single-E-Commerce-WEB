"use client";

import { Product } from "@/types";
import { useState } from "react";
import { FormHint } from "../shared/form-hint";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CategoryCombobox } from "../shared/comboboxes/category";
import { Textarea } from "../ui/textarea";
import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";

type FormState = {
  name: string;
  price: string;
  categoryId: string;
  description: string;
  files: File[];
  fileURLs: string[];
};

type ParsedFormState = {
  name: string;
  price: number;
  categoryId: string;
  description: string;
  files?: File[];
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
    price: product?.price ? String(product.price) : "",
    categoryId: product?.category.id || "",
    description: product?.description || "",
    files: [],
    fileURLs:
      product?.productImages?.map((img) =>
        getProxiedDownloadUrl(`/product/file/${img.imageFileName}`)
      ) || [],
  });

  return (
    <form
      className="w-full flex flex-col max-w-[41.5rem] mx-auto gap-y-6"
      action={async () => {
        action({
          ...formState,
          price: formState.price ? parseInt(formState.price) : 0,
          files: formState.files,
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
          onChange={(e) =>
            setFormState((st) => ({ ...st, name: e.target.value }))
          }
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
          onChange={(e) =>
            setFormState((st) => ({ ...st, price: e.target.value }))
          }
        />
      </FormHint>

      <FormHint
        label="Kategori"
        description="Kategori dari produk."
        errorMessage={errorFields.categoryId}
      >
        <CategoryCombobox
          value={formState.categoryId ? [formState.categoryId] : []}
          onValueChange={(val) =>
            setFormState((st) => ({ ...st, categoryId: val?.at(-1) || "" }))
          }
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
          onChange={(e) =>
            setFormState((st) => ({ ...st, description: e.target.value }))
          }
        />
      </FormHint>

      <FormHint label="Gambar" description="Gambar dari produk.">
        <Input
          type="file"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              const selectedFiles = Array.from(e.target.files);
              setFormState((st) => ({
                ...st,
                files: selectedFiles,
                fileURLs: selectedFiles.map((file) =>
                  URL.createObjectURL(file)
                ),
              }));
            }
          }}
        />
        {formState.fileURLs.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formState.fileURLs.map((url, i) => (
              <img
                key={i}
                src={url}
                className="h-24 w-24 object-cover rounded"
              />
            ))}
          </div>
        )}
      </FormHint>

      <Button className="w-fit ml-auto" type="submit">
        Submit
      </Button>
    </form>
  );
};
