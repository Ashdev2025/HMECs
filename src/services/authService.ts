import { apiRequest } from "./api";

export type RegisterPayload = {
  name: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  mobile: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message?: string;
  token?: string;
  admin?: unknown;
  company?: unknown;
  user?: unknown;
};

export const authService = {
  register: (payload: RegisterPayload) =>
    apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload: LoginPayload) =>
    apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};