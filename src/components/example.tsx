"use client";

import { CategoryCombobox } from "./shared/comboboxes/category";

export const ExampleForm = () => {
  return (
    <form>
      <CategoryCombobox
        value={["85554c74-a336-4f3f-9794-ac4018a2407e"]}
        onValueChange={(v) => {
          console.log(v);
        }}
      />
    </form>
  );
};
