"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

type Props = {
  appliedFilters: {
    search?: string;
    status?: string;
  };
};

export const PaymentAccountFilterForm = ({ appliedFilters }: Props) => {
  const router = useRouter();
  const [filter, setFilter] = useState({
    search: appliedFilters.search || "",
    status: appliedFilters.status || "all",
  });

  console.log(appliedFilters.search);
  console.log(!appliedFilters.search);

  return (
    <form
      className="flex flex-row justify-start items-center gap-x-4"
      action={() => {
        const searchParams = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
          searchParams.set(key, value);
        });

        router.push(`/payment-account?${searchParams.toString()}`);
      }}
    >
      <Input
        name="search"
        containerClassName="w-64 h-9"
        value={filter.search}
        placeholder="Input nama akun pembayaran"
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
          console.log(v);
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
          <SelectItem value="active">Aktif</SelectItem>
          <SelectItem value="inactive">Non Aktif</SelectItem>
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
            router.push(`payment-account`);
          }}
        >
          Hapus Filter
        </Button>
      ) : null}
    </form>
  );
};
