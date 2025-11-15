import { CategoryCreateForm } from "@/components/product-category/create-form";

const createProductCategoryPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <CategoryCreateForm />
    </div>
  );
};

export default createProductCategoryPage;
