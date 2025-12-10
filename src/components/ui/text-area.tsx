"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "./error-message";
import { cva } from "class-variance-authority";

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: string;
  containerClassName?: string;
  className?: string;
  textareaClassName?: string;
  errorMessage?: string;
};

const textareaVariants = cva(
  "flex w-full border border-neutral-400 bg-white px-3 py-2 text-sm text-neutral-700 rounded-md",
  {
    variants: {
      state: {
        default: "focus-within:ring-1 focus-within:ring-neutral-700",
        error: "ring-1 ring-red-600",
        disabled: "bg-neutral-200 text-neutral-500",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

function Textarea({
  label,
  containerClassName,
  className,
  textareaClassName,
  errorMessage,
  ...props
}: TextareaProps) {
  return (
    <div className={cn("flex flex-col w-full", containerClassName)}>
      {label ? (
        <label className="text-neutral-400 text-xs mb-1">{label}</label>
      ) : null}

      <div
        className={cn(
          textareaVariants({
            state: Boolean(errorMessage)
              ? "error"
              : props.disabled
              ? "disabled"
              : "default",
          }),
          className
        )}
      >
        <textarea
          rows={5}
          className={cn(
            "placeholder:text-neutral-400 focus-visible:outline-none bg-transparent w-full resize-none",
            textareaClassName
          )}
          {...props}
        />
      </div>

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </div>
  );
}

export { Textarea };