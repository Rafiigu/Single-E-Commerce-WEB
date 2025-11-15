"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { AdminAccount } from "@/types";

export const deactivateAdmin = async ({ id }: { id: string }) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`admin/${id}/deactivate`),
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
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as AdminAccount,
      error: null,
      errorFields: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message || null,
    };
  }
};
