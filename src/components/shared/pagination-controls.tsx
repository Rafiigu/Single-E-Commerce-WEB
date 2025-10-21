"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const getRelativePath = (url: URL) => {
  return `${url.pathname}${url.search}`;
};

type Props = {
  page: number;
  total: number;
};

export const PaginationControls = ({ page, total }: Props) => {
  const router = useRouter();

  const firstPage = 1;
  const lastPage = total > 0 ? Math.ceil(total / 20) : 1;

  const gotoPrevPage = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(page - 1));
    router.push(getRelativePath(url));
  };

  const gotoNextPage = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(page + 1));
    router.push(getRelativePath(url));
  };

  return (
    <div className="w-full flex items-center justify-end gap-x-3 text-sm mt-4">
      <Button
        className="size-9"
        disabled={page === firstPage}
        onClick={gotoPrevPage}
      >
        <ChevronLeft className="text-white" />
      </Button>
      <p className="text-neutral-700 font-medium">{page}</p>
      <Button
        className="size-9"
        disabled={page === lastPage}
        onClick={gotoNextPage}
      >
        <ChevronRight className="text-white" />
      </Button>
    </div>
  );
};
