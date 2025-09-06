import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/providers/auth-provider";
import { getAuthenticatedAccount } from "@/actions/auth/me";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Admin",
  description: "E-commerce admin side",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, error } = await getAuthenticatedAccount();

  const account = data && error === null ? data : null;

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider account={account}>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
