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
