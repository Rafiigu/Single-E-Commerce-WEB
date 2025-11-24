import { listCategories } from "@/actions/category/list-category";
import { Combobox } from "@/components/ui/combobox";
import { Category } from "@/types";
import { ComponentProps } from "react";

// cek kenapa ComponentProps gak bisa infer.
type Props = Omit<ComponentProps<typeof Combobox>, "queryFn"> & {
  value: string[];
  onValueChange: (data: Category[]) => void;
};

export const CategoryCombobox = ({ value, onValueChange, ...props }: Props) => {
  return (
    <Combobox
      value={value}
      placeholder="Select category"
      queryFn={async (search) => {
        const { data: categories, error } = await listCategories({
          page: 1,
          mode: "all",
          search,
        });

        if (error) {
          alert(error);
          return [];
        }

        return categories.map((c) => ({ value: c, label: c.name }));
      }}
      onValueChange={onValueChange}
      {...props}
    />
  );
};
