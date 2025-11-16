"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { PaymentTerm } from "@/types";

export const activatePaymentTerm = async ({ id }: { id: string }) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`payment-term/${id}/activate`),
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
      data: response.data as PaymentTerm,
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
