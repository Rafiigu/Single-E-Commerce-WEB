"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option<T> = {
  value: T;
  label: string;
};

export type ComboboxProps<T> = {
  value?: string | null;
  placeholder: string;
  queryFn: (search: string) => Promise<Option<T>[]>;
  onValueChange: (data?: T) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Combobox<T extends Record<string, any>>({
  placeholder,
  value = null,
  queryFn,
  onValueChange,
}: ComboboxProps<T>) {
  const [options, setOptions] = React.useState<Option<T>[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    const fetchAsync = async () => {
      const options = await queryFn(searchValue);
      setOptions(options);
    };

    fetchAsync();
  }, [queryFn, searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentValue
            ? options.find((option) => option.value.id === currentValue)?.label
            : placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            placeholder={placeholder}
            onValueChange={(v) => {
              setSearchValue(v);
              setCurrentValue(null);
            }}
          />
          {/* Kita nanti harus ada mekanisme searching sendiri. Kenapa?
          karena kalau kita searching pakai CommandInput, dia itu look up value
          dari si value CommandItem, dan value CommandItem itu kan id, kalau kita mau
          searching, kan harusnya kita searching berdasarkan label, cuma kan gak bisa
          jadi harus kita custom lagi. */}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, i) => (
                <CommandItem
                  key={`option-${option.value.id}-${i}`}
                  value={option.value.id}
                  onSelect={(v) => {
                    setCurrentValue(v === currentValue ? "" : v);
                    onValueChange(
                      options.find((option) => option.value.id === v)?.value
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentValue === option.value.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
