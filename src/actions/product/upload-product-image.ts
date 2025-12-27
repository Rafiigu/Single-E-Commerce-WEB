"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";

export const uploadProductImage = async ({ data }: { data: FormData }) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`product/upload`), {
      method: "POST",
      body: data,
      headers: {
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
      data: response.data.file as {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        destination: string;
        filename: string;
        path: string;
        size: number;
      }[],
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
