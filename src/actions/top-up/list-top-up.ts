"use server";

import { constructEndpoint } from "@/lib/api";
import { TopUp } from "@/types";
import { cookies } from "next/headers";

export const listTopUps = async ({
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
  console.log("listTopUps called with", startDate, endDate);
  try {
    const fetchResponse = await fetch(
      constructEndpoint("top-up", {
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
      data: response.data as TopUp[],
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
