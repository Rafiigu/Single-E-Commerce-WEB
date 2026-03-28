import { listProducts } from "@/actions/product/list-product";
import { ProductFilterForm } from "@/components/product/filter-form";
import { ProductTable } from "@/components/product/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    categoryId?: string;
  }>;
};

const ProductPage = async ({ searchParams: rawSearchParams }: Props) => {
  const searchParams = await rawSearchParams;
  const page = Math.max(parseInt(searchParams.page || "1"), 1);
  const {
    data: products,
    total,
    error,
  } = await listProducts({
    page,
    search: searchParams.search,
    status: searchParams.status,
    categoryId: searchParams.categoryId,
  });
  if (error) {
    throw new Error(error);
  }
  console.log(products);
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <div className="flex w-full items-center justify-between">
        <ProductFilterForm appliedFilters={searchParams} />
        <Link href="/product/create">
          <Button>+ Tambah</Button>
        </Link>
      </div>
      <ProductTable products={products} page={page} total={total} />
    </div>
  );
};

export default ProductPage;
