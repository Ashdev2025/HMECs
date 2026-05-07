import { apiRequest } from "./api";

export interface Role {
  id: number;
  name: string;
}

// GET ALL ROLES
export const getRoles = async (): Promise<Role[]> => {
  return apiRequest<Role[]>("/auth/roles", {
    method: "GET",
  });
};