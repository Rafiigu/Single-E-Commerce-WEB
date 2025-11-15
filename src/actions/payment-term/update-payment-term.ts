"use server";

import { MutatePaymentTermDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { PaymentTerm } from "@/types";
import { cookies } from "next/headers";

export const updatePaymentTerm = async ({
  id,
  data,
}: {
  id: string;
  data: MutatePaymentTermDTO;
}) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`payment-term/${id}`), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          (await cookies()).get("AUTH_TOKEN")?.value || ""
        }`,
      },
    });
    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: null,
        error: response.error.message || null,
        errorFields: response.errror.fields || null,
      };
    }

    return {
      data: response.data as PaymentTerm,
      error: null,
      errorFields: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message || null,
      errorFields: null,
    };
  }
};
