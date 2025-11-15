"use server";

import { MutateAdminDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { AdminAccount } from "@/types";
import { cookies } from "next/headers";

export const updateAdmin = async ({
  id,
  data,
}: {
  id: string;
  data: MutateAdminDTO;
}) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`admin/${id}`), {
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
        errorFields: response.error.fields || null,
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
      errorFields: null,
    };
  }
};
