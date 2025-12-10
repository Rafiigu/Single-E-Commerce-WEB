import { ProductCreateForm } from "@/components/product/create-form";

const CreateProductPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <ProductCreateForm />
    </div>
  );
};

export default CreateProductPage;
