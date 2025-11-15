import { getCategory } from "@/actions/category/get-category";
import { ProductCategoryEditForm } from "@/components/product-category/edit-form";
import { ProductCategory } from "@/types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EditProductCategoryPage = async ({ params: rawParams }: Props) => {
  const params = await rawParams;
  const { data: productCategory, error } = await getCategory({ id: params.id });
  if (error) {
    throw error;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <ProductCategoryEditForm
        productCategory={productCategory as ProductCategory}
      />
    </div>
  );
};

export default EditProductCategoryPage;
