"use client";

import { StatusSelect } from "@/components/shared/select/status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  appliedFilters: {
    search?: string;
    status?: string;
  };
};

export const UserFilterForm = ({ appliedFilters }: Props) => {
  const router = useRouter();
  const [filter, setFilter] = useState({
    search: appliedFilters.search || "",
    status: appliedFilters.status || "all",
  });

  return (
    <form
      className="flex w-full flex-row justify-start items-center gap-x-4"
      action={() => {
        const searchParams = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
          searchParams.set(key, value);
        });

        router.push(`/account/user?${searchParams.toString()}`);
      }}
    >
      <Input
        name="search"
        containerClassName="w-64 h-9"
        value={filter.search}
        placeholder="Input name or email"
        onChange={(e) => {
          setFilter((st) => ({
            ...st,
            search: e.target.value,
          }));
        }}
      />
      <StatusSelect
        role="user"
        onValueChange={(v) => {
          setFilter((st) => ({
            ...st,
            status: v || "all",
          }));
        }}
      />
      <Button className="size-9">
        <SearchIcon />
      </Button>
    </form>
  );
};
