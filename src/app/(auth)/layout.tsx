import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="flex w-full min-h-screen justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
