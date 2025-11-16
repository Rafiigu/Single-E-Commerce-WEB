import { listCategories } from "@/actions/category/list-category";
import { ExampleForm } from "@/components/example";
import { Combobox } from "@/components/ui/combobox";

const ExamplePage = async () => {
  const { data: categories } = await listCategories({
    page: 1,
    mode: "all",
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <ExampleForm categories={categories} />
    </div>
  );
};

export default ExamplePage;
