import { Account } from "@/types";
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
    <table>
      <thead>
        <tr>
          {Object.values(headers).map((header, i) => (
            <th key={`#table-header-${i}`}>{header as string}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={`#table-row-${i}`}>
            {Object.keys(headers).map((k, j) => (
              <td key={`#table-row-${i}-cell-${j}`}>
                {render[k] ? render[k](d[k]) : d[k] || "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
