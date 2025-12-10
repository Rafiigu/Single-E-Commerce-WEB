"use server";

import { constructEndpoint } from "@/lib/api";
import { Product } from "@/types";
import { cookies } from "next/headers";

export const getProduct = async ({ id }: { id: string }) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`product/${id}`), {
      headers: {
        "Content-Type": "application/json",
        Authorizatiom: `Bearer ${
          (await cookies()).get("AUTH_TOKEN")?.value || ""
        }`,
      },
    });

    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: null,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as Product,
      total: response.total,
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
