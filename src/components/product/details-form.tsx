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
};

type ParsedFormState = {
  name: string;
  price: number;
  categoryId: string;
  description: string;
  files?: File[];
  deletedImages?: string[];
};

type Props = {
  errorFields?: Record<string, string>;
  action: (formState: ParsedFormState) => void;
  product?: Product | null;
};

type ImageItem =
  | { type: "existing"; fileName: string; url: string }
  | { type: "new"; file: File; url: string };

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
  });

  const [images, setImages] = useState<ImageItem[]>(
    () =>
      product?.productImages?.map((img) => ({
        type: "existing",
        fileName: img.imageFileName,
        url: getProxiedDownloadUrl(`/product/file/${img.imageFileName}`),
      })) || []
  );

  const [markedForDeletion, setMarkedForDeletion] = useState<number[]>([]);
  const [confirmedDeleted, setConfirmedDeleted] = useState<string[]>([]);

  const handleImageClick = (i: number) => {
    setMarkedForDeletion((prev) =>
      prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i]
    );
  };

  const existingImages =
    product?.productImages?.map((img) => img.imageFileName) ?? [];

  const confirmDeletion = () => {
    setConfirmedDeleted((prev) => [
      ...prev,
      ...markedForDeletion
        .map((i) => images[i])
        .filter(
          (img): img is { type: "existing"; fileName: string; url: string } =>
            img.type === "existing"
        )
        .map((img) => img.fileName),
    ]);

    setImages((prev) =>
      prev.filter((_, idx) => !markedForDeletion.includes(idx))
    );

    setMarkedForDeletion([]);
  };

  return (
    <form
      className="w-full flex flex-col max-w-[41.5rem] mx-auto gap-y-6"
      action={async () => {
        const newFiles = images
          .filter(
            (img): img is { type: "new"; file: File; url: string } =>
              img.type === "new"
          )
          .map((img) => img.file);

        action({
          ...formState,
          price: formState.price ? parseInt(formState.price) : 0,
          files: newFiles,
          deletedImages: confirmedDeleted,
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
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;

            setImages((prev) => [
              ...prev,
              ...Array.from(files).map((file) => ({
                type: "new" as "new",
                file,
                url: URL.createObjectURL(file),
              })),
            ]);
          }}
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, i) => {
              const isMarked = markedForDeletion.includes(i);

              const isConfirmed =
                img.type === "existing" &&
                confirmedDeleted.includes(img.fileName);

              return (
                <div
                  key={i}
                  className={`relative h-24 w-24 rounded overflow-hidden cursor-pointer
                  ${isMarked ? "opacity-50 border-2 border-gray-400" : ""}
                  ${isConfirmed ? "opacity-30 border-2 border-red-700" : ""}`}
                  onClick={() => {
                    if (isConfirmed) return;
                    handleImageClick(i);
                  }}
                >
                  <img
                    src={img.url}
                    className="h-full w-full object-cover flex"
                  />
                  {isMarked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs text-center">
                      Pending deletion
                    </div>
                  )}

                  {isConfirmed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-xs text-center">
                      Will be deleted
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              className="h-24 w-24 flex items-center justify-center border-2 border-dashed rounded text-gray-500"
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>('input[type="file"]')
                  ?.click()
              }
            >
              +
            </button>
          </div>
        )}

        {markedForDeletion.length > 0 && (
          <Button type="button" className="mt-3" onClick={confirmDeletion}>
            Confirm Deletion
          </Button>
        )}
      </FormHint>

      <Button className="w-fit ml-auto" type="submit">
        Submit
      </Button>
    </form>
  );
};
