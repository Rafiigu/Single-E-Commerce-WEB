import { ReactNode } from "react";
import { ErrorMessage } from "../ui/error-message";

type Props = {
  label: string;
  description: string;
  errorMessage?: string;
  children: ReactNode;
};

export const FormHint = ({
  label,
  description,
  errorMessage,
  children,
}: Props) => {
  return (
    <div className="flex items-start gap-x-12 w-full max-w-[41.5rem]">
      <div className="w-full">
        <p className="text-sm text-neutral-700 font-medium">{label}</p>
        <p className="text-neutral-400 text-xs font-normal mt-0.5">
          {description}
        </p>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full">{children}</div>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </div>
    </div>
  );
};
