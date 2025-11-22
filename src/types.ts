export type AdminRole = "superadmin" | "admin" | "staff";
export type AdminAccount = {
  email: string;
  status: string;
  id: string;
  name: string;
  role: AdminRole;
  isPasswordChanged: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserAccount = {
  status: string;
  email: string;
  name: string;
  id: string;
  profile: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentTerm = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  status: string;
  price: number;
  stock: number;
  description: string;
  imageFileName: string;
  category: Pick<Category, "id" | "name">;
  createdAt: string;
  updatedAt: string;
};
