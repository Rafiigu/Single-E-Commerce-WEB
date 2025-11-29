import { listCategories } from "@/actions/category/list-category";
import { Combobox } from "@/components/ui/combobox";
import { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Combobox>, "queryFn">;

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

        return categories.map((c) => ({ data: c, value: c.id, label: c.name }));
      }}
      onValueChange={onValueChange}
      {...props}
    />
  );
};
