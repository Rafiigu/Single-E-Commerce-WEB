import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type BadgeVariants =
  | "success"
  | "danger"
  | "warning"
  | "default"
  | "info";

type Props = {
  variant?: BadgeVariants;
  children: ReactNode;
};

const map: Record<BadgeVariants, string> = {
  success: "bg-green-100 text-green-600",
  danger: "bg-red-100 text-red-600",
  warning: "bg-amber-100 text-amber-600",
  default: "bg-neutral-100 text-neutral-600",
  info: "bg-blue-100 text-blue-600",
};

export const Badge = ({ variant = "default", children }: Props) => {
  return (
    <div className={cn("text-xs px-1.5 py-0.5 rounded-sm w-fit", map[variant])}>
      {children}
    </div>
  );
};
