"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { AdminAccount } from "@/types";

export const activateAdmin = async ({ id }: { id: string }) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`admin/${id}/activate`),
      {
        method: "PATCH",
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
        data: null,
        total: 0,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as AdminAccount,
      total: response.total,
      error: null,
      errorFields: null,
    };
  } catch (error) {
    return {
      data: null,
      total: 0,
      error: (error as Error).message || null,
    };
  }
};
