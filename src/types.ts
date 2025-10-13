export type Role = "superadmin" | "admin" | "staff";
export type Account = {
  email: string;
  status: string;
  id: string;
  name: string;
  role: Role;
  isPasswordChanged: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  status: string;
  email: string;
  name: string;
  id: string;
  profile: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};
