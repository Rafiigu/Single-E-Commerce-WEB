"use client";

import { login } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-y-5 p-5 rounded-lg bg-white shadow-md w-80"
        action={async () => {
          const { error, errorFields } = await login({
            data: formState,
          });

          if (errorFields !== null) {
            setErrorFields(errorFields);
          } else if (error !== null) {
            toast.error(error);
          } else {
            toast.success("Login successful!");
            router.replace("/");
          }
        }}
      >
        <Input
          name="email"
          placeholder="Input email"
          onChange={(e) =>
            setFormState((st) => ({
              ...st,
              email: e.target.value,
            }))
          }
          errorMessage={errorFields.email}
        />
        <PasswordInput
          name="password"
          placeholder="Input password"
          onChange={(e) =>
            setFormState((st) => ({
              ...st,
              password: e.target.value,
            }))
          }
          errorMessage={errorFields.password}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
