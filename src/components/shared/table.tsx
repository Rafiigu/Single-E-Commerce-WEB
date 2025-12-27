import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { PaginationControls } from "./pagination-controls";

type Props<T> = {
  data: T[];
  page: number;
  total: number;
  headers: Partial<Record<keyof T, string>>;
  minWidths: Partial<Record<keyof T, string>>;
  render?: Partial<{
    [key in keyof T]: (val: T[key], row: T) => ReactNode;
  }>;
  renderActionColumn?: (row: T) => ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>({
  data,
  page,
  total,
  headers,
  render = {},
  renderActionColumn,
  minWidths,
}: Props<T>) {
  console.log(data);
  return (
    <div className="w-full">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {Object.entries(headers).map(([key, value], i) => (
              <th
                key={`#table-header-${i}`}
                className={cn(
                  "text-neutral-900 border-y border-l text-left bg-amber-100 px-2.5 py-2 text-sm",
                  minWidths[key],
                  {
                    "rounded-tl-sm": i === 0,
                    "border-r rounded-tr-sm":
                      i === Object.entries(headers).length - 1 &&
                      !renderActionColumn,
                  }
                )}
              >
                {value as string}
              </th>
            ))}
            {renderActionColumn ? (
              <th className="text-neutral-900 border-y border-l text-left bg-amber-100 px-2.5 py-2 text-sm border-r rounded-tr-sm sticky right-0">
                Action
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={`#table-row-${i}`}>
              {Object.keys(headers).map((k, j) => (
                <td
                  key={`#table-row-${i}-cell-${j}`}
                  className={cn(
                    "border-b border-l px-2.5 h-11 text-sm text-neutral-500",
                    {
                      "border-r":
                        j === Object.entries(headers).length - 1 &&
                        !renderActionColumn,
                      "rounded-bl-sm": i === data.length - 1 && j === 0,
                      "rounded-br-sm":
                        i === data.length - 1 &&
                        j === Object.entries(headers).length - 1 &&
                        !renderActionColumn,
                    }
                  )}
                >
                  {render[k] ? render[k](d[k], d) : d[k] || "-"}
                </td>
              ))}
              {renderActionColumn ? (
                <td
                  className={cn(
                    "border-b border-l border-r px-2.5 py-1.5 text-sm text-neutral-500",
                    {
                      "rounded-br-sm": i === data.length - 1,
                    }
                  )}
                >
                  {renderActionColumn(d)}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls page={page} total={total} />
    </div>
  );
}
