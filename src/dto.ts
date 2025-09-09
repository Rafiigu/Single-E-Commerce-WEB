export type LoginDTO = {
  email: string;
  password: string;
};

export type UpdatePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};
