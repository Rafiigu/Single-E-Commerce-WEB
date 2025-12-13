"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      className="flex flex-row justify-start items-center gap-x-4"
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
      <Select
        value={filter.status}
        onValueChange={(v) => {
          setFilter((st) => ({
            ...st,
            status: v,
          }));
        }}
      >
        <SelectTrigger label="Status" className="w-57">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          <SelectItem value="verified">Terverifikasi</SelectItem>
          <SelectItem value="not-verified">Belum Terverifikasi</SelectItem>
        </SelectContent>
      </Select>
      <Button className="size-9">
        <SearchIcon />
      </Button>
      {appliedFilters.search !== undefined &&
      (appliedFilters.search !== "" || appliedFilters.status !== "all") ? (
        <Button
          variant="outline"
          onClick={() => {
            setFilter({ search: "", status: "all" });
            router.push(`/account/user`);
          }}
        >
          Hapus Filter
        </Button>
      ) : null}
    </form>
  );
};
