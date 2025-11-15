"use server";

import { MutateCategoryDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { ProductCategory } from "@/types";
import { cookies } from "next/headers";

export const updateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: MutateCategoryDTO;
}) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`category/${id}`), {
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
      data: response.data as ProductCategory,
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
