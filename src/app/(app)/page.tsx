"use client";

import { logout } from "@/actions/auth/logout";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { account } = useAuth();

  return (
    <div>
      <p>{account?.name || ""}</p>
      <Button
        onClick={async () => {
          await logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
