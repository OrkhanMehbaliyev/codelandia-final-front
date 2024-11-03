export type User = {
  username: string;
  email: string;
  role: string;
  created_at: string;
  user_id: string;
};
export type LoginFormTypes = {
  email: string;
  password: string;
};
export type RegistrationFormTypes = {
  email: string;
  password: string;
  username: string;
};
export type authCheckResponse = {
  isAuthorized: boolean;
};
export type UserFormTypes = {
  username: string;
  role: string;
  formData: FormData;
};
export type UserUpdateTypes = {
  id: string | undefined;
  formData: FormData;
};
