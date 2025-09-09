"use server";

import { UpdatePasswordDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { Account } from "@/types";
import { cookies } from "next/headers";

export const updatePassword = async ({ data }: { data: UpdatePasswordDTO }) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint("auth/admin/update-password"),
      {
        method: "PATCH",
        body: JSON.stringify(data),
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
        errorFields: response.error.fields || null,
      };
    }

    return {
      data: response.data as Account,
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
