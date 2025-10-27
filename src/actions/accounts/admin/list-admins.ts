"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { AdminAccount } from "@/types";

export const listAdmins = async ({
  mode = "pagination",
  page,
  size = 20,
  search,
  status = "all",
}: {
  mode?: "all" | "pagination";
  page: number;
  size?: number;
  search?: string;
  status?: string;
}) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint("admin", {
        mode,
        page,
        size,
        search,
        status,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("AUTH_TOKEN")?.value || ""
          }`,
        },
      }
    );
    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: [] as AdminAccount[],
        total: 0,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as AdminAccount[],
      total: response.total,
      error: null,
      errorFields: null,
    };
  } catch (error) {
    return {
      data: [] as AdminAccount[],
      total: 0,
      error: (error as Error).message || null,
    };
  }
};
