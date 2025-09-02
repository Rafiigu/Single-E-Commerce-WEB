"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { useState } from "react";

const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form className="flex flex-col gap-y-5 p-5 rounded-lg bg-white shadow-xl w-80">
        <Input name="email" placeholder="Input email" />
        <PasswordInput name="password" placeholder="Input password" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
