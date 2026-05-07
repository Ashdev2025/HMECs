export type UserStatus = "active" | "inactive" | "pending";
export type ModalMode = "add" | "edit";

export type User = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
};

export type UserFormData = {
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  status: UserStatus;
};