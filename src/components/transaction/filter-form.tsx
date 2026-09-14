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
import { DatePickerWithRange } from "../shared/calendar/date-picker";
import { endOfDay, startOfDay } from "date-fns";

type Props = {
  appliedFilters: {
    status?: string;
    startDate?: string;
    endDate?: string;
  };
};

export const TransactionFilterForm = ({ appliedFilters }: Props) => {
  const router = useRouter();
  const [filter, setFilter] = useState({
    status: appliedFilters.status || "all",
    startDate: appliedFilters.startDate || "",
    endDate: appliedFilters.endDate || "",
  });

  return (
    <form
      className="flex flex-row justify-start items-center gap-x-4"
      action={() => {
        const searchParams = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
          searchParams.set(key, value);
        });

        router.push(`/transaction?${searchParams.toString()}`);
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
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in process">In Process</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <DatePickerWithRange
        value={
          filter.startDate && filter.endDate
            ? { from: new Date(filter.startDate), to: new Date(filter.endDate) }
            : undefined
        }
        onChange={(range) => {
          setFilter({
            ...filter,
            startDate:
              startOfDay(range?.from ?? new Date()).toISOString() ?? "",
            endDate: endOfDay(range?.to ?? new Date()).toISOString() ?? "",
          });
        }}
      />
      <Button className="size-9">
        <SearchIcon />
      </Button>
      {(appliedFilters.status && appliedFilters.status !== "all") ||
      (appliedFilters.startDate && appliedFilters.endDate) ? (
        <Button
          variant="outline"
          onClick={() => {
            setFilter({ status: "all", startDate: "", endDate: "" });
            router.push(`/transaction`);
          }}
        >
          Hapus Filter
        </Button>
      ) : null}
    </form>
  );
};
