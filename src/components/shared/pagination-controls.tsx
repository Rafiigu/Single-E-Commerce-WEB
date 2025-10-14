"use client";

import { useRouter } from "next/navigation";

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
    <div className="flex items-center gap-x-3 text-sm mt-4">
      <button
        className="text-neutral-700 disabled:text-neutral-400"
        disabled={page === firstPage}
        onClick={gotoPrevPage}
      >
        Prev
      </button>
      <p>{page}</p>
      <button
        className="text-neutral-700 disabled:text-neutral-400"
        disabled={page === lastPage}
        onClick={gotoNextPage}
      >
        Next
      </button>
    </div>
  );
};
