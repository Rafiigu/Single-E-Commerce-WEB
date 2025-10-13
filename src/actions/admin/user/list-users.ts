"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { User } from "@/types";

export const listUsers = async () => {
  try {
    const fetchResponse = await fetch(constructEndpoint("user"), {
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
        data: [] as User[],
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as User[],
      error: null,
      errorFields: null,
    };
  } catch (error) {
    return {
      data: [] as User[],
      error: (error as Error).message || null,
    };
  }
};
