import { cn } from "@/lib/utils";

export function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />;
}

export function FieldLabel(props: React.ComponentProps<"label">) {
  return <label className="text-sm font-medium" {...props} />;
}
