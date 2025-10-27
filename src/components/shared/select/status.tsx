import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentPropsWithoutRef } from "react";

type StatusSelectProps = ComponentPropsWithoutRef<typeof Select> & {
  role: "admin" | "user";
};

export const StatusSelect = ({ role, ...props }: StatusSelectProps) => {
  const options =
    role === "admin"
      ? [
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]
      : [
          { label: "All", value: "all" },
          { label: "Terverifikasi", value: "verified" },
          { label: "Belum Terverifikasi", value: "not-verified" },
        ];

  return (
    <Select {...props}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
