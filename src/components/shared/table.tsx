import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props<T> = {
  data: T[];
  headers: Partial<Record<keyof T, string>>;
  minWidths: Partial<Record<keyof T, string>>;
  render?: Partial<{
    [key in keyof T]: (val: T[key]) => ReactNode;
  }>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>({
  data,
  headers,
  render = {},
  minWidths,
}: Props<T>) {
  return (
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
                    i === Object.entries(headers).length - 1,
                }
              )}
            >
              {value as string}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={`#table-row-${i}`}>
            {Object.keys(headers).map((k, j) => (
              <td
                key={`#table-row-${i}-cell-${j}`}
                className={cn(
                  "border-b border-l px-2.5 py-1.5 text-sm text-neutral-500",
                  {
                    "border-r": j === Object.entries(headers).length - 1,
                    "rounded-bl-sm": i === data.length - 1 && j === 0,
                    "rounded-br-sm":
                      i === data.length - 1 &&
                      j === Object.entries(headers).length - 1,
                  }
                )}
              >
                {render[k] ? render[k](d[k]) : d[k] || "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
