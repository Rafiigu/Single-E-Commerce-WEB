import { getProduct } from "@/actions/product/get-product";
import { ProductEditForm } from "@/components/product/edit-form";
import { Product } from "@/types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EditProductPage = async ({ params: rawParams }: Props) => {
  const params = await rawParams;
  const { data: product, error } = await getProduct({
    id: params.id,
  });
  if (error) {
    throw error;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <ProductEditForm product={product as Product} />
    </div>
  );
};

export default EditProductPage;
