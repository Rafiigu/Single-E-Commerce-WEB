"use server";

import { LoginDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { Account } from "@/types";
import { cookies } from "next/headers";

export const login = async ({ data }: { data: LoginDTO }) => {
  console.log(data);
  try {
    const fetchResponse = await fetch(constructEndpoint("auth/admin/login"), {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
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

    (await cookies()).set("AUTH_TOKEN", response.data.authToken);

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
