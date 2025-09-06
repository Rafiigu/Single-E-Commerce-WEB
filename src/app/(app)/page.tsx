"use client";

import { useAuth } from "@/components/providers/auth-provider";

const HomePage = () => {
  const { account } = useAuth();

  return <div></div>;
};

export default HomePage;
