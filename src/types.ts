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
