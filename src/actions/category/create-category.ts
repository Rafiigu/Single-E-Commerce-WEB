"use server";

import { MutateCategoryDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { Category } from "@/types";
import { cookies } from "next/headers";

export const createCategory = async ({ data }: { data: MutateCategoryDTO }) => {
  try {
    const fetchResponse = await fetch(constructEndpoint("category"), {
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
      data: response.data as Category,
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
