"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

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
import { useDebounce } from "@uidotdev/usehooks";

type Option<T> = {
  value: T;
  label: string;
};

export type ComboboxProps<T> = {
  value?: string[];
  placeholder: string;
  queryFn: (search: string) => Promise<Option<T>[]>;
  onValueChange: (data?: T[]) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Combobox<T extends Record<string, any>>({
  placeholder,
  value = [],
  queryFn,
  onValueChange,
}: ComboboxProps<T>) {
  const [options, setOptions] = React.useState<Option<T>[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    const fetchAsync = async () => {
      const options = await queryFn(debouncedSearchValue);
      setOptions(options);
    };

    fetchAsync();
  }, [queryFn, debouncedSearchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {/* TODO: perlu efisiensi */}
          {currentValue && currentValue.length > 0 ? (
            <span>
              {currentValue
                .map((id) => {
                  const option = options.find(
                    (option) => option.value.id === id
                  );
                  return option ? option.label : "";
                })
                .filter((v) => v.length > 0)
                .join(", ")}
            </span>
          ) : (
            <span className="text-neutral-500 font-normal">{placeholder}</span>
          )}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={searchValue}
            placeholder={placeholder}
            onValueChange={(v) => {
              setSearchValue(v);
              setCurrentValue([]);
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
                    let newCurrentValue: string[] = [];
                    if (currentValue?.includes(v)) {
                      newCurrentValue = currentValue.filter((s) => s !== v);
                    } else {
                      newCurrentValue = [...currentValue, v];
                    }
                    setCurrentValue(newCurrentValue);
                    onValueChange(
                      options
                        .filter((option) =>
                          newCurrentValue.includes(option.value.id)
                        )
                        .map((option) => option.value)
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentValue.includes(option.value.id)
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
