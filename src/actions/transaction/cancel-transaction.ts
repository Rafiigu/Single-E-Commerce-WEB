"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { Transaction } from "@/types";

export const cancelTransaction = async ({
  id,
  cancellationReason,
}: {
  id: string;
  cancellationReason: string;
}) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`transaction/${id}/cancel`),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("AUTH_TOKEN")?.value || ""
          }`,
        },
        body: JSON.stringify({ cancellationReason }),
      },
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
      data: response.data as Transaction,
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
