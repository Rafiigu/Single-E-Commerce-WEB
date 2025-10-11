"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { Account } from "@/types";

export const listAdmins = async () => {
  try {
    const fetchResponse = await fetch(constructEndpoint("admin"), {
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
        data: [] as Account[],
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as Account[],
      error: null,
      errorFields: null,
    };
  } catch (error) {
    return {
      data: [] as Account[],
      error: (error as Error).message || null,
    };
  }
};
