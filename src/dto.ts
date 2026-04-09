export type LoginDTO = {
  email: string;
  password: string;
};

export type UpdatePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};

export type MutateAdminDTO = {
  name: string;
  email: string;
  role: string;
};

export type MutateCategoryDTO = {
  name: string;
};

export type MutatePaymentTermDTO = {
  name: string;
};

export type MutatePaymentAccountDTO = {
  accountHolderName: string;
  paymentTermId: string;
  accountNumber: string;
};

export type MutateProductDTO = {
  name: string;
  price: number;
  categoryId: string;
  description: string;
  fileNames?: { imageFileName: string }[];
  deletedFileNames?: string[];
};

export type MutateProductImagesDTO = {
  fileNames?: string[];
};
