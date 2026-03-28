"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

type Props = {
  appliedFilters: {
    status?: string;
  };
};

export const TopUpFilterForm = ({ appliedFilters }: Props) => {
  const router = useRouter();
  const [filter, setFilter] = useState({
    status: appliedFilters.status || "all",
  });

  console.log("test", appliedFilters);

  return (
    <form
      className="flex flex-row justify-start items-center gap-x-4"
      action={() => {
        const searchParams = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
          searchParams.set(key, value);
        });

        router.push(`/top-up?${searchParams.toString()}`);
      }}
    >
      <Select
        value={filter.status}
        onValueChange={(v) => {
          setFilter((st) => ({
            ...st,
            status: v,
          }));
        }}
      >
        <SelectTrigger label="Status" className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          <SelectItem value="requested">Requested</SelectItem>
          <SelectItem value="transferred">Transferred</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
      <Button className="size-9">
        <SearchIcon />
      </Button>
      {appliedFilters.status && appliedFilters.status !== "all" ? (
        <Button
          variant="outline"
          onClick={() => {
            setFilter({ status: "all" });
            router.push(`top-up`);
          }}
        >
          Hapus Filter
        </Button>
      ) : null}
    </form>
  );
};
