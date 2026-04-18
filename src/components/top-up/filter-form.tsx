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

type Props = {
  appliedFilters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  };
};

export const TopUpFilterForm = ({ appliedFilters }: Props) => {
  const router = useRouter();
  const [filter, setFilter] = useState({
    status: appliedFilters.status || "all",
    dateFrom: appliedFilters.dateFrom || "",
    dateTo: appliedFilters.dateTo || "",
  });

  console.log("dateFrom", appliedFilters.dateFrom);
  console.log("dateTo", appliedFilters.dateTo);

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
      <DatePickerWithRange
        value={
          filter.dateFrom && filter.dateTo
            ? { from: new Date(filter.dateFrom), to: new Date(filter.dateTo) }
            : undefined
        }
        onChange={(range) => {
          setFilter((st) => ({
            ...st,
            dateFrom: range?.from ? range.from.toISOString() : "",
            dateTo: range?.to
              ? new Date(
                  range.to.getFullYear(),
                  range.to.getMonth(),
                  range.to.getDate(),
                  23,
                  59,
                  59,
                  999,
                ).toISOString()
              : "",
          }));
        }}
      />
      <Button className="size-9">
        <SearchIcon />
      </Button>
      {(appliedFilters.status && appliedFilters.status !== "all") ||
      (appliedFilters.dateFrom && appliedFilters.dateTo) ? (
        <Button
          variant="outline"
          onClick={() => {
            setFilter({ status: "all", dateFrom: "", dateTo: "" });
            router.push(`top-up`);
          }}
        >
          Hapus Filter
        </Button>
      ) : null}
    </form>
  );
};
