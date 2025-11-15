import { listCategories } from "@/actions/category/list-category";
import { ProductCategoryFilterForm } from "@/components/product-category/filter-form";
import { ProductCategoryTable } from "@/components/product-category/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
};

const CategoryPage = async ({ searchParams: rawSearchParams }: Props) => {
  const searchParams = await rawSearchParams;
  const page = Math.max(parseInt(searchParams.page || "1"), 1);
  const {
    data: categories,
    total,
    error,
  } = await listCategories({
    page,
    search: searchParams.search,
    status: searchParams.status,
  });
  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <div className="flex w-full items-center justify-between">
        <ProductCategoryFilterForm appliedFilters={searchParams} />
        <Link href="/product-category/create">
          <Button>+ Tambah</Button>
        </Link>
      </div>
      <ProductCategoryTable categories={categories} page={page} total={total} />
    </div>
  );
};

export default CategoryPage;
