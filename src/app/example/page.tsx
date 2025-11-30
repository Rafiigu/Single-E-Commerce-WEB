"use client";

import { CategoryCombobox } from "@/components/shared/comboboxes/category";
import { useState } from "react";

const ExamplePage = () => {
  const [values, setValues] = useState<string[]>([
    "126e78f5-91d7-441d-9db6-1cb882ead9ae",
  ]);
  console.log("From Page:", values);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <CategoryCombobox
        label="Category"
        placeholder="Category"
        value={values}
        onValueChange={(val) => {
          setValues(val || []);
        }}
        includeAllOption
      />
    </div>
  );
};

export default ExamplePage;
