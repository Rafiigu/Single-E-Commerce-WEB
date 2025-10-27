"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { AdminAccount } from "@/types";

export const getAuthenticatedAccount = async () => {
  try {
    const fetchResponse = await fetch(constructEndpoint("auth/admin/me"), {
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
