export type AdminRole = "superadmin" | "admin" | "staff";
export type AdminAccount = {
  email: string;
  status: string;
  id: string;
  name: string;
  role: AdminRole;
  isPasswordChanged: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAccount = {
  status: string;
  email: string;
  name: string;
  id: string;
  profile: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductCategory = {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PaymentTerm = {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date
}