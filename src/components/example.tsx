"use client";

import { CategoryCombobox } from "./shared/comboboxes/category";

export const ExampleForm = () => {
  return (
    <form>
      <CategoryCombobox
        onValueChange={(v) => {
          console.log(v);
        }}
      />
    </form>
  );
};
