"use server";

import { constructEndpoint } from "@/lib/api";
import { Transaction } from "@/types";
import { cookies } from "next/headers";

export const listTransactions = async ({
  mode = "pagination",
  page,
  size = 20,
  status = "all",
  startDate,
  endDate,
}: {
  mode?: "all" | "pagination";
  page: number;
  size?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint("transaction", {
        mode,
        page,
        size,
        status,
        startDate,
        endDate,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("AUTH_TOKEN")?.value || ""
          }`,
        },
      },
    );

    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: [],
        total: 0,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as Transaction[],
      total: response.total,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      total: 0,
      error: (error as Error).message || null,
    };
  }
};
