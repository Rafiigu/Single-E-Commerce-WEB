"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { ProductCategory } from "@/types";

export const deactivateCategory = async ({ id }: { id: string }) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`category/${id}/deactivate`),
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
      data: response.data as ProductCategory,
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
