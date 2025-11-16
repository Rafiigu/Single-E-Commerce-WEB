"use client";

import { ProductCategory } from "@/types";
import { Combobox } from "./ui/combobox";

export const ExampleForm = ({
  categories,
}: {
  categories: ProductCategory[];
}) => {
  return (
    <form>
      <Combobox
        options={categories.map((c) => ({ value: c, label: c.name }))}
        placeholder="Select category"
        onQueryValueChange={(search) => {
          console.log(search);
          // tembak ke corresponding API.
        }}
        onValueChange={(v) => {
          console.log(v);
        }}
      />
    </form>
  );
};
