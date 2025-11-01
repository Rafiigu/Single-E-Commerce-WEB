"use server";

import { MutateUserDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";

export const createUser = async ({ data }: { data: MutateUserDTO }) => {
  try {
    const fetchResponse = await fetch(constructEndpoint("auth/user/register"), {
      method: "POST",
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
        errorFields: response.error.fields || null,
      };
    }

    return {
      data: response.data,
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
